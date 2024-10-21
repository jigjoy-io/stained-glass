export default class UrlValidator {

    static validate(type, url){
        if(type=='image')
            return(url.match(/\.(jpeg|jpg|gif|png)$/) != null)
    }
    
}