export const headerOpen = (documentTitle: string) => {
    return  `<html>
        <head>
            <title>${documentTitle}</title>
            <meta charset="UTF-8">
            <script type="text/javascript" src="index.js"></script>
            <script charset="UTF-8" src="highlight.js"></script>
            <link rel="stylesheet" href="highlight.css" />
            <link rel="stylesheet" type="text/css" href="index.css" />
            <link rel="shortcut icon" type="image/png" href="favicon.png"/>
        </head>
        <body>`;
};

export const PROJECT_DETAIL =
`<div class="topsection">
    <table>
        <tr>
            <td>
                <img src="apex_doc_2_logo.png" style="height: 90px; margin-left: 5px;"/>
            </td>
            <td>
                <h2 style="margin: -15px 0 0 0;">ApexDoc2 | Apex Documentation</h2>Check out the GitHub project at:<br/>
                <a href="https://github.com/no-stack-dub-sack/ApexDoc2-VSCode">
                    https://github.com/no-stack-dub-sack/ApexDoc2-VSCode
                </a>
                <br/>`;

export const HEADER_CLOSE = `</td></tr></table></div>`;

export const FOOTER =
                    `</div>
                </div>
            </td>
        </tr>
    </table>
    <hr/>
    <center class="footer">
        <a href="https://github.com/no-stack-dub-sack/ApexDoc2-VSCode" target="_blank">
            Powered By ApexDoc2
        </a>
    </center>
</body>
</html>`;

export const DEFAULT_HOME_CONTENTS = `<h2>Project Home</h2>`;

export const EXTERNAL_LINK =
    '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink">' +
    '<path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 ' +
    '0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 ' +
    '0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 ' +
    '0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 ' +
    '0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg>';