export async function doFetchGetNotes (url){
  try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const { notes } = await response.json();
        return notes;
      } else {
        return false;
      }
      
    } catch (error) {
      console.error('Error at registration time: ', error);
      return false;
    }
  }

  export async function doFetchAddNote (url){
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const { notes } = await response.json();
          return notes;
        } else {
          return false;
        }
        
      } catch (error) {
        console.error('Error at registration time: ', error);
        return false;
      }
    }