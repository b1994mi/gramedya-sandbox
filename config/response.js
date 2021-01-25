exports.success = res => {
    return {
        success: true
        , message: res.message ? res.message : "success lho"
        , data: res.data ? res.data : [] 
    }
}

exports.failed = res => {
    return {
        success: false
        , message: res.message ? res.message : "nahloh gagal"
        , data: res.data ? res.data : [] 
    }
}