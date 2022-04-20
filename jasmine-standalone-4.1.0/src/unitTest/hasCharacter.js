function hasCharacters( data ){
    if(/^[0-9]+$/.test(data) || data.length == 0 ) 
        return false; // characters and numbers
        return true; // only numbers
}