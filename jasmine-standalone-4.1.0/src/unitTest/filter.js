function filter( set, toFilter ) {
    for(var i = 0; i < toFilter.length; i++){
      if(set.has(toFilter[i])) set.delete(toFilter[i])
    }
    return set;
}