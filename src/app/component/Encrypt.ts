import * as CryptoJS from 'crypto-js';

export class Encrypt {
    constructor() { }
 
    AngularEncryption:boolean=true;
    Keys:string='4512631236589784';
    //The set method is use for encrypt the value.
    set( value){
      if(this.AngularEncryption==true)
      {
        var key = CryptoJS.enc.Utf8.parse(this.Keys);
        var iv = CryptoJS.enc.Utf8.parse(this.Keys);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    
        return encrypted.toString();
      }else{
        return value;
      }
     
    }
  
    //The get method is use for decrypt the value.
    get( value){
      if(this.AngularEncryption==true)
      {
        var key = CryptoJS.enc.Utf8.parse(this.Keys);
        var iv = CryptoJS.enc.Utf8.parse(this.Keys);
        var decrypted = CryptoJS.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    
        return decrypted.toString(CryptoJS.enc.Utf8);
      }else{
        return value;
      }
      
    }
}