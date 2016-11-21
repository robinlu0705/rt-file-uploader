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

**include jQuery (require v1.7 or higher)**
```html
<script src="jquery-1.7.1.min.js"></script>
```

## Basic Usage

**include module**
```html
<script src="rt_file_uploader.js"></script>
```

**create a container in your html**
```html
<div id="uploader" style="margin: 20px; min-height: 150px; background-color: #f3f3f3;"></div>
```

**generate the file uploader**

```javascript
var FileUploader = window.RT.FileUploader;
var fileuploader = FileUploader.gen($('#uploader'), {
    /* options */
    limit: 3,
    minHeight: 150,
    thumbnailWidth: 120,
    thumbnailHeight: 90,
    debug: false,
    onUpload: function(itemList, update) {
        /* file uploading handler */
    }
});
```

### Options

* `limit`: (Number) How many files uploader can take. **Default**: 3
* `minHeight`: (Number) Minimum height of uploader in pixels. **Default**: 150
* `thumbnailWidth`: (Number) Thumbnail width in pixels. **Default**: 120
* `thumbnailHeight`: (Number) Thumbnail height in pixels. **Default**: 90
* `debug`: (Boolean) If true, module will output some debug information. **Default**: false
* `onUpload`: (Function) When it is called, the function is passed 2 arguments: 
    * `itemList`: (Object[]) A list of objects With two properties, `id` (Number) and `file` (File).
    * `update`: (Function) Invoke `update` when you need to update thumbnails.

        eg:

        ```javascript
        onUpload: function(itemList, update) {
            $.post('http://your.upload.api/', {
                fileArray: $.map(itemList, function(item) {
                    return item.file;
                })
            }).done(function(dataArray) {
                /* invoke update with the list of shape: */
                update($.map(dataArray, function(data, idx) {
                    id: itemList[idx].id,
                    url: data.url,
                    status: FileUploader.FILE_STATUS.COMPLETE,
                    progress: 100,
                    errMsg: '',
                    userDefinedData: {
                        /* anything you need */
                    }
                });
            }).fail(function() {
                /* invoke update with the list of shape: */
                update($.map(dataArray, function(data, idx) {
                    id: itemList[idx].id,
                    url: '',
                    status: FileUploader.FILE_STATUS.ERROR,
                    progress: 0,
                    errMsg: 'Error message will show on thumbnails',
                    userDefinedData: {
                        /* anything you need */
                    }
                });
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

* `getFiles`: Returns a list of objects with properties:
    * `id`: (Number)
    * `url`: (String)
    * `status`: (String) One of `FileUploader.FILE_STATUS`.
    * `progress`: (Number) From 0 to 100.
    * `errMsg`: (String)
    * `userDefinedDate`: The data you set while invoking `update` or `setFiles`.
* `setFiles`: Explicitly set the file data.

    eg:

    ```javascript
    var FileUploader = window.RT.FileUploader;
    fileuploader = FileUploader.gen($('#uploader'), { /* options */ });
    
    /* a default file list with 3 elements */
    var defaultFiles = $.map(Array.apply(window, { length: 3 }), function() {
        return {
            url: 'http://image.url',
            status: FileUploader.FILE_STATUS.COMPLETE,
            progress: 0,
            errMsg: '',
            userDefinedData: {
                /* anything you need */
            }
        };
    });

    fileuploader.setFiles(defaultFiles);
    ```
