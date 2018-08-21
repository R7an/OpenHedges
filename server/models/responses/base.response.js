class BaseResponse {

    constructor() {
        this.isSuccessful = false
        this.item = null
        this.alert = {
            message: null,
            type: null,
        }
    }

}

module.exports = BaseResponse