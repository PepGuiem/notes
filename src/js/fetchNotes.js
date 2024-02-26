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
        const responseData = await response.json();
        return responseData;
      } else {
        return false;
      }
      
    } catch (error) {
      console.error('Error at registration time: ', error);
      return false;
    }
  }

  export async function doFetchGetNote (url){
    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          return responseData;
        } else {
          return false;
        }
        
      } catch (error) {
        console.error('Error at registration time: ', error);
        return false;
      }
    }

  export async function doFetchAddNote (url, title, content, privcity, type){
    var data = {
        title : title,
        body : content,
        isPublic : privcity,
        isVoiceNote : type
    }
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          const  note  = await response.json();
          return note;
        } else {
          return false;
        }
        
      } catch (error) {
        console.error('Error at registration time: ', error);
        return false;
      }
    }

    export async function doFetchModifyNote (url, title, content, privcity, ){
      var data = {
          title : title,
          body : content,
          isPublic : false,
          isVoiceNote : false
      }
      try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          if (response.ok) {
            const  note  = await response.json();
            return note;
          } else {
            return false;
          }
          
        } catch (error) {
          console.error('Error at registration time: ', error);
          return false;
        }
      }