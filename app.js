const accessUrl =
  'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

const getWidget = async () => {
  //using a try catch to add user friendliness
  try {
    //fecthing api response, converting it to JSON data, and finally accesing the actual data
    const response = await fetch(accessUrl)
      .then((res) => res.json())
      .then((data) => data.list)
    console.log(response)
    // itterating through the array of objects
    for (let i = 0; i < response.length; i++) {
      //using the loop, entering each object and getting the: url, name, branding, and image
      let url = response[i].url
      let name = response[i].name
      let branding = response[i].branding
      let imgUrl = response[i].thumbnail[0]['url']
      let category = response[i].categories[0]

      //creating elements to add to DOM
      const link = document.createElement('a')
      const img = document.createElement('img')
      const title = document.createElement('a')
      const brand = document.createElement('a')

      //setting the url of each individual item, giving them a class for CSS
      link.setAttribute('href', url)
      img.setAttribute('src', imgUrl)
      img.setAttribute('class', 'images')
      // note: chose to display category on hover over the image
      img.setAttribute('title', category)
      title.setAttribute('href', url)
      title.setAttribute('class', 'titles')
      brand.setAttribute('href', url)
      brand.setAttribute('class', 'brands')

      //appending the img created to a link tag
      link.appendChild(img)

      //setting Dom text of a tags
      title.innerHTML = name
      brand.innerHTML = branding

      // console.log(title)

      //appending to dom
      document.getElementById('widget').appendChild(link)
      document.getElementById('widget').appendChild(title)
      document.getElementById('widget').appendChild(brand)
    }
  } catch (error) {
    console.log(`Your error is ${error}`)
  }
}

getWidget()
