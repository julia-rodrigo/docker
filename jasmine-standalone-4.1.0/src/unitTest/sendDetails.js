function sendDetails( data ) { // go through data
    var message = [];
    props = Object.keys(data);
    var set = new Set(props);
  
    for (var i = 0; i < props.length; i++) set.add(props[i]);
    set = filter(set, ['pageSize', 'pageNr', 'sortOrder', 'sortBy']);
  
    for(let item of set){
      message.push(item + ": This parameter doesn't exist");
    }

    if(message.length >0) return message ;
    else return [ "No errors" ];
  }

  function filter( set, toFilter ) {
    for(var i = 0; i < toFilter.length; i++){
      if(set.has(toFilter[i])) set.delete(toFilter[i])
    }
    return set;
}