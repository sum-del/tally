import { Toast } from 'antd-mobile';


function successToast(text) {
    Toast.success(text+'!!!', 1);
}
function failToast(text) {
    Toast.fail(text+'!!!', 1);
}
function loadingToast(text) {
    Toast.loading(text+'...', 1, () => {
        console.log('Load complete !!!');
    });
}
export {successToast,failToast,loadingToast}