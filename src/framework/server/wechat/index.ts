/**
 * @fileOverview 微信认证页
 * @author Max
 **/

import * as express from 'express';
import config from '../config';

const router = express.Router();

router.all('/', (req, res) => {
    const redirectParam = req.query.redirect;

    if(!req.query.code && !req.query.state) {
        if(!redirectParam) {
            res.status(500).send('please send redirect param');
            return;
        }

        res.redirect(`${config.getIn(['@WECHAT', 'AUTH'])}?appid=${config.getIn(['@WECHAT', 'APP_ID'])}&redirect_uri=${encodeURI(`${config.getIn(['@WECHAT', 'SERVER'])}/wechat-auth`)}&response_type=code&scope=snsapi_base&state=${encodeURIComponent(redirectParam)}#wechat_redirect`);
        return;
    } else if(req.query.code) {
        _https.get(`${config.getIn(['@WECHAT', 'GET_ACCESS_TOKEN'])}?appid=${config.getIn(['@WECHAT', 'APP_ID'])}&secret=${config.getIn(['@WECHAT', 'APP_SECRET'])}&code=${req.query.code}&grant_type=authorization_code`, true)
             .then(data => {
                 let json = JSON.parse(data);
                 req.session['openid'] = json.openid;

                 let redirectPath = decodeURIComponent(req.query.state);
                 res.redirect(`/${redirectPath}${redirectPath.indexOf('?') !== -1 ? '&' : '?'}openid=${json.openid}`);
             }).catch(err => {
                 console.error(err);
             });
    }
});
router.all('/stub', (req, res) => {
    const redirectParam = req.query.redirect; 
    const openid = req.query.openid;

    res.redirect(`/${redirectParam}${redirectParam.indexOf('?') !== -1 ? '&' : '?'}openid=${openid}`);
})

export = router;