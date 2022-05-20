export class MySet{
  constructor(data){
    this.obj = {};
    this.size = 0;
    if(data && data[Symbol.iterator]) {
      for(let i of data) {
        this.add(i);
      }
    }
  }

  add(value){
    if(!this.obj[value]) {
      this.obj[value] = value;
      this.size++;
    }
  }

  has(value) {
    if(this.obj[value] && this.obj[value] === value){
      return true;
    }else {
      return false;
    }
  }

  delete(value) {
    const result = this.has(value);
    if(result) {
      delete this.obj[value];
      this.size--;
    }
    return result;
  }
}