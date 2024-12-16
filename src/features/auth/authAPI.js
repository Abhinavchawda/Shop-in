// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://shop-in-server.vercel.app/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
        credentials: "include"
      }
    )

    const data = await response.json();
    resolve({ data })
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://shop-in-server.vercel.app/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
          credentials: "include"
        }
      )

      if (response.ok) {  //if password verified 
        const data = await response.json();
        resolve({ data })
      }
      else {
        const err = await response.json();
        reject({ err })
      }
    }
    catch (err) {
      reject({ err })
    }
  }
  );
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("https://shop-in-server.vercel.app/auth/logout/", {
      method: "POST"
    })
      .then(resp => {
        if (resp.ok) {
          // Set the cookie's expiration to a past date to delete it
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          // navigate('/login');
        }
      })
      .catch(error => console.error('Logout failed', error));
  }
  );
}