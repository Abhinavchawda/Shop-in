// A mock function to mimic making an async request for data
export function fetchAllProducts() {

  return new Promise( async(resolve) => {
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json();

    resolve({data})
  }
  );
}


export function fetchProductsByFilter({filter, sort, pagination}) {
  // filter object 
  //filter = {"category" : ["electronics", "smartphones"]}
  //sort object
  //sort = {_sort: "price", _order: "desc"}
  //sort object
  //pagination = {_page: 1, limit: 10}


  let queryString = '';
  console.log("queryString", queryString)
  for(let key in filter) {
    const categoryValues = filter[key]
    if(categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length -1]
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for(let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for(let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  console.log("queryString", queryString)
  return new Promise( async(resolve) => {
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = await response.json();

    // const totalItems = await response.headers.get('X-Total-Count')

    // resolve({data:{products: data, totalItems: totalItems}})

    resolve({data})
  }
  );
}
