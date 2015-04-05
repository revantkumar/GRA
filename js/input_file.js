var fileInput = $('#files');
var uploadButton = $('#upload');

uploadButton.on('click', function() {
    if (!window.FileReader) {
        alert('Your browser is not supported')
    }
    var input = fileInput.get(0);
    
    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        $(reader).on('load', processFile);
    } else {
        alert('Please upload a file before continuing')
    } 
});

function processFile(e) {
    var delimiter =  $('#delim').val();
    if (delimiter == "\\t" || delimiter == "tab") {
        delimiter = "\t";
    }
    if (delimiter == "space") {
        delimiter = " ";
    }
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split("\n");
        console.log(results);
        $('#csvInput').val("");
        for (i = 0; i < results.length; i++) {
            rows = results[i].split(delimiter);
            for (j=0; j < rows.length-1; j++) {
                $('#csvInput').val($('#csvInput').val()+rows[j]+"\t");
            }
            $('#csvInput').val($('#csvInput').val()+rows[rows.length-1]+"\n");
        }
    }
}