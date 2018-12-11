const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const scrape = require('html-metadata');
const { get } = require('lodash');

const app = new Koa();
const router = new Router();

router
  .get('/scrape', async ctx => {
    const href = ctx.query.href;
    const validContentTypes = ['image', 'video', 'html'];
    const infoAboutUrl = {
      articleUrl: '',
      contentType: '',
      mediaLink: '',
      title: '',
      description: '',
      error: '',
    };

    let reqInfo = null;
    try {
      reqInfo = await axios.head(href, {
        headers: {
          'Accept': 'text/html',
        },
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = Object.assign(infoAboutUrl, {
        error: 'It is not valid url',
      });
      return;
    }

    const contentType = getContentType(get(reqInfo, 'headers[content-type]'));

    if (!validContentTypes.includes(contentType)) {
      ctx.status = 400;
      ctx.body = Object.assign(infoAboutUrl, {
        error: 'Content type of link is not valid',
      });
      return;
    }

    if (contentType === 'image' || contentType === 'video') {
      ctx.body = Object.assign(infoAboutUrl, {
        contentType,
        mediaLink: href,
      });
      return;
    }

    try {
      const metadata = await scrape(href);

      ctx.body = {
        contentType: 'html',
        title: get(metadata, 'openGraph.title', ''),
        description: get(metadata, 'openGraph.description', ''),
        mediaLink: get(metadata, 'openGraph.image.url', ''),
        articleUrl: get(metadata, 'openGraph.url', ''),
      };
      return;
    } catch (err) {
      ctx.status = 400;
      ctx.body = Object.assign(infoAboutUrl, {
        error: 'It is not valid html link',
      });
    }
  })

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3001);

console.log('Server is started!');

function getContentType (contentTypeHeader) {
  if (/^image\//.test(contentTypeHeader)) {
    return 'image';
  }
  if (/text\/html/.test(contentTypeHeader)) {
    return 'html';
  }
  if (/^video\//.test(contentTypeHeader)) {
    return 'video';
  }
  return '';
};