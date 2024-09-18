export function createBrand(brand) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://shop-in-server.vercel.app/brands/', 
        {
          method: "POST",
          body: JSON.stringify(brand),    
          headers: {'content-type' : 'application/json'}
        }
      )
      const data = await response.json();
      resolve({ data })
    }
    );
}

export function createCategory(category) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://shop-in-server.vercel.app/categories/', 
        {
          method: "POST",
          body: JSON.stringify(category),    
          headers: {'content-type' : 'application/json'}
        }
      )
      const data = await response.json();
      resolve({ data })
    }
    );
}