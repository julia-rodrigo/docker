function hasWrongParameters( data ) {
    props = Object.keys(data);
    var set = new Set(props);
  
    for (var i = 0; i < props.length; i++) set.add(props[i]);
    set = filter(set, ['pageSize', 'pageNr', 'sortOrder', 'sortBy']);
  
    if (set.size > 0 ) return true;
    return false;
  }