const https = require("https");

exports.downloadFile = (req, res) => {
    const fileUrl = "https://www.buk.edu.ng/sites/default/files/Student's_handbooks/SOFTWARE%20ENGINEERING%20HANDBOOK.pdf";
    const fileName = "Software_Engineering_Handbook.pdf";

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/pdf");

    https.get(fileUrl, (fileRes) => {
        fileRes.pipe(res);
    }).on("error", (err) => {
        res.status(500).send("Error downloading file");
    });
};
