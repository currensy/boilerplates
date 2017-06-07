import angular from 'angular';
import {$,jQuery} from 'jquery';
import modal from 'angular-ui-bootstrap/src/modal';

import 'bootstrap/dist/css/bootstrap.css'; 
import bootstrap from 'bootstrap/dist/js/bootstrap.js'; 
import '../style/app.css';
import dataService from './getData.service';
import ModalController from './ModalController';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

/*class ModalController {
  constructor($uibModalInstance, info) {
    console.log(info);
    this.$uibModalInstance = $uibModalInstance;
    this.info = info; 
  }

  ok() {
    this.$uibModalInstance.close();
  };

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  };


}*/

class AppCtrl {
  constructor(dataService,$uibModal) {
    this.url = 'https://github.com/preboot/angular-webpack';
    this.$uibModal = $uibModal;
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

  open(size, info) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: `
<div class="modal-header">
            <h3 class="modal-title" id="modal-title">Info!</h3>
        </div>
        <div class="modal-body" id="modal-body">
            {{ modalCtrl.info | json}}
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="modalCtrl.ok()">OK</button>
            <button class="btn btn-warning" type="button" ng-click="modalCtrl.cancel()">Cancel</button>
        </div>
      `,
      controller: ModalController,
      controllerAs: 'modalCtrl',
      size: size,
      resolve: {
        info: function () {
          return info;
        }
      }
    });

  
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [modal])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .controller('ModalController')
  .service('dataService', dataService);

export default MODULE_NAME;