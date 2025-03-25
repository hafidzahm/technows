const http = require("../helper/http");
const { GoogleGenerativeAI } = require("@google/generative-ai");
class NewsController {
  static async getAllNews(req, res, next) {
    try {
      let response = await http.get("/api/tech/news");
      console.log(response);
      console.log(req.query, `<------------ request`);
      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  static async getDetailNews(req, res, next) {
    try {
      let { key } = req.query;
      let response = await http.get(`api/detail/${key}`);
      console.log(response, "response");
      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }
  static async getSummarizeNews(req, res, next) {
    try {
      let { key } = req.query;
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      let response = await http.get(`api/detail/${key}`);
      console.log(response, "response");
      let content = response.data.results.content;

      const prompt = `tolong rangkum berita ini (${content}) dengan format 5W+1H dalam format json {when: <kapan berita tsb terjadi>, what:<apa yang terjadi, apa teknologi yang diberitakan>, where: <dimana berita tsb terjadi>, who: <siapa yang disorot dan terlibat dalam berita>, why: <kenapa berita tsb terjadi>, how: <bagaimana berita tsb terjadi, atau sebab>}`;

      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      let dataOutput = result.response.text().replace(/```json/, '').replace(/```/g, '')
      dataOutput = JSON.parse(dataOutput)
      
      res.status(200).json(dataOutput);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NewsController;
