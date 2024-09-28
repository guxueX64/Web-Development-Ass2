var {
  fundraiser,category
} = require('./table'); //table.js里面的定义的表信息导入
var { query } = require('./db'); //将db.js里面定义的query方法导入
class Surface { //声明的表操作类
  fieds = [];
  sheetName = '';
  index = '';
  value = '';
  selectAll = '';
  query = undefined;
  dateReg = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}\s*[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/;
  numReg = /^[0-9]+.?[0-9]*/;
  constructor(sheetName, fiedList, query) {
    if (!sheetName || !fiedList || !query) {
      throw new Error('创建数据表类操作类失败,缺少构造参数....');
    }
    this.sheetName = sheetName;
    this.fieds = fiedList;
    this.query = query;
    this.selectAll = `SELECT * from ${sheetName};`;
  }

  //表查询 指定字段 方法
  selectColum(colum, call) {
    //按需查询
    const sql = `SELECT ${colum} from ${this.sheetName};`;
    //调用query方法查询
    this.query(sql, call);
  }

  //表查询 方法
  select(data, call) {
    if (data && call && typeof data !== 'function' && typeof call === 'function') {
      let order = ""
      if (data['order']) {
        //排序
        order = ` order by ${data['order']} `;
        delete data.order;
      }
      //按需查询
      const sql = `SELECT * from ${this.sheetName} where ${data} ${order};`;
      //调用query方法查询
      this.query(sql, call);
      return;
    }
    if (!call) {
      this.query(this.selectAll, call);
    }
  }

}

//创建表操作类实例
const fundraiserSheet = new Surface(fundraiser.name, fundraiser.fieds, query);
const categorySheet = new Surface(category.name, category.fieds, query);

//导出实例
module.exports = {
  fundraiserSheet,
  categorySheet
};
