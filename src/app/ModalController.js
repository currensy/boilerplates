export default class ModalController {
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
}