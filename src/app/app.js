import angular from 'angular';

import '../style/app.css';
import dataService from './getData.service';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor(dataService) {
    this.url = 'https://github.com/preboot/angular-webpack';
    dataService.readData().then((res) => {
      this.users = res.data;
    });
    this.sort = {
      asc: false,
      desc: false
    };

  }

  sortByName() {
    console.log('Here!');
    const asc = ((a,b) => {
      return a.name.localeCompare(b.name);
    })

    const desc = ((a,b) => {
      return b.name.localeCompare(a.name);
    })

    if(!this.sort.asc) {
      this.users = this.users.sort(asc);
      this.sort.asc = true;
      this.sort.desc = false;
    }  else {
      this.users = this.users.sort(desc);
      this.sort.asc = false;
      this.sort.desc = true;
    }
  
  }

  getDetails(index) {
    console.log(this.users[index]);
  }

  
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .service('dataService', dataService);

export default MODULE_NAME;