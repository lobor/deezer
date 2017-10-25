export function sort(key, datas, type) {
  if (!type) {
    return datas;
  }

  let result = datas.sort((a, b) => {
    let first = a[key];
    let last = b[key];
    switch (type) {
      case 'desc':
        first = b[key];
        last = a[key];
        break;
    }
    return first.localeCompare(last);
  });
  return result;
}

export function filter (value, key, datas) {
  let filter = []
  for (let data of datas) {
    if (data[key].match(new RegExp(value, 'i'))) {
      filter.push(data)
    }
  }
  return filter;
}

export function getApi(datas) {
  let result = [];
  for (let res of datas) {
    result.push({
      picture: res.artist.picture,
      artist: res.artist.name,
      title: res.title
    })
  }
  return result;
}


export function resetHeader(keyColumn, type, headers) {
  for (let header of headers) {
    if (header.className !== null && header.key !== keyColumn){
      header.className = null;
    } else if (header.key === keyColumn) {
      header.className = type;
    }
  }
  return headers;
}
