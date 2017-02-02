curl -i -X POST \
    -F "IwpDoc=@sample.pdf;type=application/pdf;filename=Sample.pdf" \
    --user weblogic:welcome1 -k \
    'https://localhost:3000/TrustServices/MIG/IWP/65008?action=UPLOAD'
    
