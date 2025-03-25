const http = require('../helper/http');
class NewsController {
     static async getAllNews (req, res, next) {
        try {
            let response = await http.get('/api/tech/news')
            console.log(response);
            console.log(req.query, `<------------ request`);
            res.status(200).json(response.data)
        } catch (error) {
           next(error) 
        }
    }

    static async getDetailNews(req, res, next) {
        try {
            let {key} = req.query
            let response = await http.get(`api/detail/${key}`)
            console.log(response, 'response');
            res.status(200).json(response.data)
        } catch (error) {
         next(error)   
        }
    }
    static async getSummarizeNews(req, res, next) {
        try {
            let {key} = req.query
            let response = await http.get(`api/detail/${key}`)
            console.log(response, 'response');
            let content = response.data.results.content
            res.status(200).json(content)
        } catch (error) {
         next(error)   
        }
    }
}

module.exports = NewsController;