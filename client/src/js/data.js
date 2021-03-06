const keyword = "space";
const amountOfImages = 25;

function formatImageData(imageData) {
  let imageArray = [];

  imageData.forEach((image, index) => {
    let imageObject = {
      index: index,
      id: image.id,
      width: image.width,
      height: image.height,
      src: {
        small: image.urls.small,
        regular: image.urls.regular,
      },
      date: image.created_at,
      photographer: image.user.name,
      description: image.description,
      camera: {
        brand: image.exif.make,
        model: image.exif.model,
      },
      location: {
        name: image.location.name,
        lat: image.location.position.latitude,
        long: image.location.position.longitude,
      },
    };
    imageArray.push(imageObject);
  });
  return imageArray;
}

function storeDataInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export async function getData() {
  if (localStorage.getItem("imageData") === null) {
    await fetch(
      `https://hyper-stargazer.herokuapp.com/random/${keyword}&${amountOfImages}`
    )
      .then((response) => response.json())
      .then((data) => {
        let formattedData = formatImageData(data);
        storeDataInLocalStorage("imageData", formattedData);
        console.log("in fetch");
      });
    console.log("getData if");
    return getDataFromLocalStorage("imageData");
  } else {
    console.log("getData else");
    return getDataFromLocalStorage("imageData");
  }
}
