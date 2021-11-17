import { FILE_TYPE } from "./constants";

export const validateFile = (fileName) =>{ 
    for (var j = 0; j < FILE_TYPE.length; j++) {
        var sCurExtension = FILE_TYPE[j];
        if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() === sCurExtension.toLowerCase()) {
            return true
        }
    }
    return false;
}