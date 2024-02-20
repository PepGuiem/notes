
export async function doFetchRegisterUser (username, password, url){
    var data = {
        username : username,
        password : password
    }

    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
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

export async function doFetchLoginUser (username ,password, url){
  var data = {
    username : username,
    password : password
}

try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token)
      return true;
    } else {
      return false;
    }
    
  } catch (error) {
    console.error('Error at registration time: ', error);
    return false;
  }
}

export async function doFetchChangePassword (oldPassword , newPassword, url){
  var data = {
    oldPassword : oldPassword,
    newPassword : newPassword
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
      return true;
    } else {
      return false;
    }
    
  } catch (error) {
    console.error('Error at registration time: ', error);
    return false;
  }
}
