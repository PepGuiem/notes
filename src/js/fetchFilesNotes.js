export async function doFetchAddFileNote (url,file){
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          body: formData
        });
        if (response.ok) {
          return true;
        } else {
          return false;
        }
        
      } catch (error) {
        console.error('Error at registration time: ', error);
        return false;
      }
    }

export async function doFetchGetFiles (url){
    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        });
        if (response.ok) {
            const  file  = await response.json();
            return file;
        } else {
          return false;
        }
        
      } catch (error) {
        console.error('Error at registration time: ', error);
        return false;
      }
}

export async function doFetchGetFile (uri){
    try {
        const response = await fetch(`http://localhost:8080${uri}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
            const  file  = await response.blob();
            return file;
        } else {
          return false;
        }
        
      } catch (error) {
        console.error('Error at registration time: ', error);
        return false;
      }
}

export async function doFetchDelteFileNote (uri){
    try {
        const response = await fetch(`http://localhost:8080${uri}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        });
        if (response.ok) {
          return true;
        } else {
          return false;
        }
        
      } catch (error) {
        console.error('Error at registration time: ', error);
        return false;
      }
    }
