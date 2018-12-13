```bash
yarn # npm i
yarn start
```
And go to `http://localhost:3001`

Method: `GET`

Simply api:  `http://localhost:3001/scrape?href=[your_href]`

#### Examples:

- Article: https://medium.com/wordsthatmatter/why-truth-is-james-comey-s-word-of-the-year-726e99434d6c
```
http://localhost:3001/scrape?href=https://medium.com/wordsthatmatter/why-truth-is-james-comey-s-word-of-the-year-726e99434d6c

Responce:
{
  "articleUrl": "https://medium.com/wordsthatmatter/why-truth-is-james-comey-s-word-of-the-year-726e99434d6c",
  "contentType": "html",
  "mediaLink": "https://cdn-images-1.medium.com/max/1200/1*8tepPRU5zl9dhw8IysCtXw.gif",
  "title": "Why ‘Truth’ Is James Comey’s Word of the Year – Words That Matter – Medium",
  "description": "2018 delivered an unprecedented cascade of lies",
}
```

- Image: https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg
```
http://localhost:3001/scrape?href=https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg

Responce:
{
  "contentType": "image",
  "mediaLink": "https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
}
```

- Video: http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
```
http://localhost:3001/scrape?href=http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4

Responce:
{
  "contentType": "video",
  "mediaLink": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
}
```
- Error link: fdsfsdfwds
```
http://localhost:3001/scrape?href=fdsfsdfwds

Responce (code 400):
{
  "error": "It is not valid url"
}
```
