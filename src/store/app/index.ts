import { observable, action, configure } from 'mobx';
configure({ enforceActions: 'observed' })
class AppStore {
    // github personal access token
    auth: string | undefined = 'd37d82bc256fccf552dbcf2581aa077674e94c98';

    @observable loading: boolean = false;

    @action toggleLoading(loading: boolean) {
        this.loading = loading
        console.log('toggleloading', this.loading)
    }
}

export default new AppStore()