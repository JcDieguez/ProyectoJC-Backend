import HistoriesDAO from '../dao/Mongo/HistoriesDAO.js'
const historiesDAO = new HistoriesDAO();
export default class HistoriesService {
    constructor() {
    }


    getHistories = () =>{
        return historiesDAO.getHistories();
    }

    getHistoryBy = (params) => {
        return historiesDAO.getHistoryBy(params);
    }

    createHistory = (history) =>{
        return historiesDAO.createHistory(history);
    }

    updateHistory = (id,history) =>{
        return historiesDAO.updateHistory(id,history)
    }
}
