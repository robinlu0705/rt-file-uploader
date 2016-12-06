# Ruten File Uploader

An UI component for file(image) uploading.

Supports drag-and-drop uploading, drag-and-drop reordering, 露天圖庫.

## Dependencies

**include style-sheet using less.js (or you can pre-compile less file to css)**
```html
<link rel="stylesheet/less" type="text/css" href="rt_file_uploader.less" />
<script src="less.min.js" type="text/javascript"></script>
```

**include font-awesome**
```html
<script src="https://your.fontawesome.cdn.js"></script>
```

**include React (require v15 or higher)**
```html
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
```

## Basic Usage

**include module**
```html
<script src="rt_file_uploader.js"></script>
```

**create a container in your html**
```html
<div id="uploader" style="margin: 20px; min-height: 160px; background-color: #f3f3f3;"></div>
```

**generate the file uploader**

```javascript
const FileUploader = window.RT.FileUploader;
const fileuploader = FileUploader.gen('uploader', {
    /* options */
    limit: 3,
    minHeight: 160,
    thumbnailWidth: 120,
    thumbnailHeight: 90,
    debug: false,
    onUpload(itemList, update) {
        /* file uploading handler */
    },
    onFetchGallery(categoryVal, page, update) {
        /* gallery files fetching handler */
    },
    onUploadFromGallery(itemList, update) {
        /* file uploading from gallery handler */
    },
    onDelete(itemList) {
        /* deleting handler */
    }
});
```

### Options

* `limit`: (Number) How many files uploader can take. **Default**: 3
* `minHeight`: (Number) Minimum height of uploader in pixels. **Default**: 160
* `thumbnailWidth`: (Number) Thumbnail width in pixels. **Default**: 120
* `thumbnailHeight`: (Number) Thumbnail height in pixels. **Default**: 90
* `galleryFilterOpts`: (Object[]) Used for Gallery's filter and pagination. An array of objects with the properties should be supplied:
    * `categoryName`: (String) The text showed in the filter select.
    * `categoryVal`: (String) This value will be used in `onFetchGallery`.
    * `totalPages`: (Number) Total pages of the category.
* `debug`: (Boolean) If true, module will output some debug information. **Default**: false
* `onUpload`: (Function) Called when user inserts some files through DnD/FilePicker. When it is called, the function is passed 2 arguments: 
    * `itemList`: (Object[]) An array of objects with two properties, `id` (Number) and `file` (File).
    * `update`: (Function) Invoke `update` when you need to update thumbnails.

        eg:

        ```javascript
        onUpload(itemList, update) {
            fetch('http://your.upload.api/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(itemList.map(item => item.file))
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw new Error();
                }
            }).then(dataArray => {
                /* invoke update with an array of objects with the properties: */
                update(dataArray.map((data, idx) => ({
                    id: itemList[idx].id,
                    url: data.url,
                    status: FileUploader.FILE_STATUS.COMPLETE,
                    progress: 100,
                    errMsg: '',
                    userDefinedData: {
                        /**
                         * anything you need, the component stores it and pass it back to you on `getFiles`
                         * e.g.
                         * hash: data.hash
                         */
                    }
                }));
            }).catch(error => {
                /* invoke update with an array of objects with the properties: */
                update(dataArray((data, idx) => ({
                    id: itemList[idx].id,
                    url: '',
                    status: FileUploader.FILE_STATUS.ERROR,
                    progress: 0,
                    errMsg: 'Error message will show on thumbnails',
                    userDefinedData: {
                        /* anything you need, the component stores it and pass it back to you on `getFiles` */
                    }
                }));
            });
        }
        ```

* `onFetchGallery`: (Function) Called when Gallery box is up or category/page changed. When it is called, the function is passed 3 arguments: 
    * `categoryVal`: (String)
    * `page`: (Number)
    * `update`: (Function) Invoke `update` to update the images showed in Gallery box.

        eg:

        ```javascript
        onFetchGallery(categoryVal, page, update) {
            fetch('http://your.gallery.api/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    class: categoryVal,
                    page: page
                })
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw new Error();
                }
            }).then(dataArray => {
                /* invoke update with an array of objects with the properties: */
                update(dataArray.map((data, idx) => ({
                    url: data.url,
                    userDefinedData: {
                        /**
                         * anything you need, the component stores it and pass it back to you on `onUploadFromGallery`
                         * e.g.
                         * fileName: data.fileName
                         */
                    }
                }));
            });
        }
        ```

* `onUploadFromGallery`: (Function) Called when user inserts some files through Gallery. When it is called, the function is passed 2 arguments: 
    * `itemList`: (Object[]) An array of objects with three properties, `id` (Number), `url` (String) and `userDefinedData` (Object).
    * `update`: (Function) Invoke `update` when you need to update thumbnails.

        eg:

        ```javascript
        onUploadFromGallery(itemList, update) {
            fetch('http://your.upload.from.gallery.api/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(itemList.map(item => item.userDefinedData.fileName))
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw new Erros();
                }
            }).then(dataArray => {
                /* invoke update with an array of objects with the properties: */
                update(dataArray.map((data, idx) => ({
                    id: itemList[idx].id,
                    url: data.url,
                    status: FileUploader.FILE_STATUS.COMPLETE,
                    progress: 100,
                    errMsg: '',
                    userDefinedData: {
                        /**
                         * anything you need, the component stores it and pass it back to you on `getFiles`
                         * e.g.
                         * hash: data.hash
                         */
                    }
                }));
            }).catch(error => {
                /* invoke update with an array of objects with the properties: */
                update(dataArray.map((data, idx) => ({
                    id: itemList[idx].id,
                    url: '',
                    status: FileUploader.FILE_STATUS.ERROR,
                    progress: 0,
                    errMsg: 'Error message will show on thumbnails',
                    userDefinedData: {
                        /* anything you need, the component stores it and pass it back to you on `getFiles` */
                    }
                }));
            });
        }
        ```

* `onDelete`: (Function) Called when files are dropped from module. This occurred when user click the delete button or pushes old files away by inserting new ones. When it is called, the function is passed 1 argument: 
    * `itemList`: (Object[]) An array of objects with six properties same as `getFiles`, `id` (Number), `url` (String), `status` (String), `progress` (Number), `errMsg` (String) and `userDefinedData` (Object).

        eg:

        ```javascript
        onDelete(itemList) {
            fetch('http://your.delete.api/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(itemList.map(item => item.userDefinedData.fileName))
            });
        }
        ```

## Static Methods & Constants

* `gen`: See [Basic Usage](#basic-usage).
* `FILE_STATUS`: (Object) There are 4 properties corresponding to the file status:
    * `COMPLETE`
    * `LOADING`
    * `TIMEOUT`
    * `ERROR`

## Instance Methods

* `getFiles`: Returns an array of objects with properties:
    * `id`: (Number)
    * `url`: (String)
    * `status`: (String) One of `FileUploader.FILE_STATUS`.
    * `progress`: (Number) From 0 to 100.
    * `errMsg`: (String)
    * `userDefinedDate`: The data you set while invoking `update` or `setFiles`.
* `setFiles`: Explicitly set the file data.

    eg:

    ```javascript
    const FileUploader = window.RT.FileUploader;
    const fileuploader = FileUploader.gen('uploader', { /* options */ });
    
    /* a default file array with 3 elements */
    const defaultFiles = Array.from({ length: 3 }).map(() => ({
        url: 'http://image.url',
        status: FileUploader.FILE_STATUS.COMPLETE,
        progress: 0,
        errMsg: '',
        userDefinedData: {
            /* anything you need */
        }
    }));

    fileuploader.setFiles(defaultFiles);
    ```
