import axios from 'axios';
export default () => {
  return {
    inpostApiUrl: 'https://api.inpost.pl',
    modalOpen: true,
    isUsed: true,
    selected: null,
    input: '',
    points: [],
    key: null,

    setMessage(message) {
      if (!this.$refs.message) return;
      this.$refs.message.textContent = message;
    },

    init() {
      // If user unchecks the isUsed input, reset this.selected variable
      this.$watch('isUsed', () => {
        if (this.isUsed == false) this.selected = null;
        this.setMessage('');
      });
    },

    async fetchKey() {
      const apiUrl = 'https://shof-dev.myshopify.com/api/2023-10/graphql.json';

      const query = `
  {
    metaobjects(type: "inpost", first: 10) {
      edges {
        node {
          id
          fields {
            value
          }
        }
      }
    }
  }
`;

      const accessToken = '0dc2507ca5800d743e5546faaf2654fe';

      const headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      };

      try {
        const response = await axios.post(apiUrl, { query }, { headers });
        return response.data.data.metaobjects.edges[0].node.fields[0].value;
        // Handle the response data here
      } catch (error) {
        console.error('Error:', error);
        // Handle errors here
      }
    },

    async handleInput() {
      this.setMessage('');
      const fetchPointsByName = async (key) => {
        try {
          // Make a GET request to the API with authentication
          const response = await axios.get(`${this.inpostApiUrl}/v1/points?name=${this.input.toUpperCase()}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${key}`,
            },
          });

          // Return the list of items from the response data

          return response.data.items;
        } catch (error) {
          console.error('Error fetching data:', error.message);
          // Handle errors as needed
          return [];
        }
      };

      const fetchPointsByPostCode = async (key) => {
        try {
          // Make a GET request to the API with authentication
          const response = await axios.get(`${this.inpostApiUrl}/v1/points?post_code=${this.input}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${key}`,
            },
          });

          // Return the list of items from the response data

          return response.data.items;
        } catch (error) {
          console.error('Error fetching data:', error.message);
          // Handle errors as needed
          return [];
        }
      };

      const API_KEY = await this.fetchKey();
      // Get points by their post code
      const points = await fetchPointsByPostCode(API_KEY);
      // Format them and update points state
      this.points = this.formatPoints(points.slice(0, 10));
      // Get a point by name
      const pointByName = await fetchPointsByName(API_KEY);
      // If one found, update state
      if (pointByName.length > 0) this.formatPoints(pointByName.slice(0, 10));
    },

    async handleLocalization() {
      const getLocation = () => {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const coords = {
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude,
                };
                resolve(coords);
              },
              (error) => reject(error)
            );
          } else {
            reject(new Error('Geolokacja nie jest wspierana przez tą przeglądarkę'));
          }
        });
      };

      const fetchPointsByLocation = async (location, key) => {
        try {
          // Make a GET request to the API with authentication
          const response = await axios.get(
            `${this.inpostApiUrl}/v1/points?relative_point=${location.latitude},${location.longitude}&sort_by=distance_to_relative_point`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
              },
            }
          );

          // Return the list of items from the response data

          return response.data.items;
        } catch (error) {
          console.error('Error fetching data:', error.message);
          // Handle errors as needed
          return [];
        }
      };

      const location = await getLocation();

      const API_KEY = await this.fetchKey();

      const points = await fetchPointsByLocation(location, API_KEY);
      this.points = this.formatPoints(points.slice(0, 10));
    },
    formatPoints(points) {
      return (this.points = points.map((point) => {
        const name = point.name;
        const description = `${point.address_details.street} ${point.address_details.building_number}, ${point.address_details.city}`;
        return { name, description };
      }));
    },

    //* If There appears a better solution to get In-Post Points in the future, this whole function is not needed along with it's refs and listeners
    handleSubmit(e) {
      let isValid = true;
      const form = this.$refs.form;
      const formData = e.detail;

      // If the option is used, check validation
      if (this.isUsed) {
        if (!this.selected) isValid = false;

        if (this.selected) {
          // Get note element
          const note = this.$refs.note;
          // Add inpost point to note content
          const updatedNote = `${note.value} | Paczkomat: ${this.selected}`;
          // Update note in form data

          formData.set('note', updatedNote);
        }
      }

      if (isValid) {
        // If the form is valid, send the form data using `fetch`
        fetch(form.getAttribute('action'), {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              // If the response is successful, redirect to the desired page
              window.location.href = '/checkout'; // Change to your success URL
            } else {
              // Handle errors
            }
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
            alert('Nastąpił problem z przetwarzaniem Twojego zamowienia');
          });
      } else {
        // If the form is not valid, show an error message
        this.setMessage('Wybierz paczkomat');
      }
    },
  };
};
