function myFetch(method, url, data) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };

        chr.onerror = function() {
            reject(xhr.statusText);
        };
        xhr.send(JSON.stringify(data));
    });
}


myFetch('GET', 'http://localhost:3000/todos')
.then(function(response) {
    console.log(`GET : ${response}`);
})
.catch(function(error) {
    console.error(`GET Error ${error}`)
});

myFetch('POST', 'http://localhost:3000/todos', {post_data: 'POST DATA'})
.then(function (response) {
    console.log(`POST: ${response}`);
})
.catch(function(error) {
    console.error('POST error: ${error}');
});

myFetch('PUT', 'http://localhost:3000/todos/1', { put_data: 'PUT DATA' })
.then(function(response) {
    console.log(`PUT : ${response}`);
})
.catch(function(error) {
    console.error(`PUT Error : ${error}`);
});

myFetch('DELETE', 'http://localhost:3000/todos/1')
.then(function(response) {
    console.log(`DELETE: ${response}`)
})
.catch(function(error) {
    console.error(`DELETE error: ${error}`)
});