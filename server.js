var express = require('express'),
    cors = require('cors'),
	multer  = require('multer');

var mockresponse = {
    Version: "1.0",
    AttachedToInvestigation: 60018,
    IwpListing: [
        {
            DocumentUrl: "http://api.lawsociety.com.au/TrustServices/MIG/IWP/Repository/60018/ClientReport.docx",
            DocumentName: "ClientReport.docx",
            DocumentType: "docx",
            Thumbnail: null,
            Description: null,
            Size: "2.3 M",
            UploadDate: "2016-11-04T10:53:46"
        },
        {
            DocumentUrl: "http://api.lawsociety.com.au/TrustServices/MIG/IWP/Repository/60018/ScannedFinancialStatements.pdf",
            DocumentName: "ScannedFinancialStatements.pdf",
            DocumentType: "pdf",
            Thumbnail: null,
            Description: null,
            Size: "5.1 M",
            UploadDate: "2016-11-05T10:53:46"
        },
        {
            DocumentUrl: "http://api.lawsociety.com.au/TrustServices/MIG/IWP/Repository/60018/EmailTrailWithLawFirmPrincipals.pdf",
            DocumentName: "EmailTrailWithLawFirmPrincipals.pdf",
            DocumentType: "pdf",
            Thumbnail: null,
            Description: null,
            Size: "3.1 M",
            UploadDate: "2016-11-05T11:53:46"
        },
        {
            DocumentUrl: "http://api.lawsociety.com.au/TrustServices/MIG/IWP/Repository/60018/Timesheet.xls",
            DocumentName: "Timesheet.xls",
            DocumentType: "pdf",
            Thumbnail: null,
            Description: null,
            Size: "0.2 M",
            UploadDate: "2016-11-05T11:55:46"
        }
    ]
};

var mockresponse1 = {
    Version: "1.0",
    AttachedToInvestigation: 60018,
    IwpListing: [
        {
            DocumentUrl: "http://api.lawsociety.com.au/TrustServices/MIG/IWP/Repository/60018/ClientReport.docx",
            DocumentName: "ClientReport.docx",
            DocumentType: "docx",
            Thumbnail: null,
            Description: null,
            Size: "2.3 M",
            UploadDate: "2016-11-04T10:53:46"
        },
        {
            DocumentUrl: "http://api.lawsociety.com.au/TrustServices/MIG/IWP/Repository/60018/ScannedFinancialStatements.pdf",
            DocumentName: "ScannedFinancialStatements.pdf",
            DocumentType: "pdf",
            Thumbnail: null,
            Description: null,
            Size: "5.1 M",
            UploadDate: "2016-11-05T10:53:46"
        },
        {
            DocumentUrl: "http://api.lawsociety.com.au/TrustServices/MIG/IWP/Repository/60018/Timesheet.xls",
            DocumentName: "Timesheet.xls",
            DocumentType: "pdf",
            Thumbnail: null,
            Description: null,
            Size: "0.2 M",
            UploadDate: "2016-11-05T11:55:46"
        }
    ]
};

var investid;
var app = express();
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })


app.post("/TrustServices/MIG/IWP/:investid", upload.array('file'), function (request, response) {
    // show the uploaded file name                                                               
    console.log("file name", request.files[0].originalname);
    console.log("file encoding", request.files[0].encoding);
    console.log("file mine",request.files[0].mimetype);
    console.log("investid:", request.params.investid);
    console.log("File uploaded success at " + Date.now().toString());
    investid = request.params.investid;
	mockresponse.AttachedToInvestigation = investid;
    response.status(200).json(mockresponse);                                                             
});

// render file upload form                                                                       
app.get("/TrustServices/MIG/IWP/:investid", function (request, response) {
    switch(request.query.action) {
    case 'LIST':
		investid = request.params.investid;
		mockresponse.AttachedToInvestigation = investid;
		response.status(200).json(mockresponse1);
        break;
    case 'DELETE':
		investid = request.params.investid;
		mockresponse.AttachedToInvestigation = investid;
		response.status(200).json(mockresponse1);
        break;
	case 'DOWNLOAD':
	    response.set("x-filename",'flight.pdf');
        response.set("Access-Control-Expose-Headers",'x-filename,content-type');
	    response.download("uploads/flight.pdf");
		//response.status(200).json({filename:'sample filename.pdf'});
	
	    break;
	case 'UPLOAD':
            investid = request.params.investid;
            mockresponse.AttachedToInvestigation = investid;
            response.status(200).json(mockresponse);
            break;

    default:
        break;
	}; 
    console.log("investid:", request.params.investid);
    console.log("action:", request.query.action);	
	
});                                                                                              

app.listen(3000);