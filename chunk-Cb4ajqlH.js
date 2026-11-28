var b={default:0,title:1,subtitle:2,section:3,header:4,text:5,number:6,currency:7,percent:8,subtotalText:9,subtotalNumber:10,subtotalCurrency:11,totalText:12,totalNumber:13,totalCurrency:14,totalPercent:15,note:16};var I=new Set([`title`,`subtitle`,`section`,`note`]);var w=new Set([`\\`,`/`,`?`,`*`,`[`,`]`,`:`]);var C={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&apos;`};function v(e){let t=``;for(let r of e){let n=r.codePointAt(0)??0;(n===9||n===10||n===13||n>=32&&n<=55295||n>=57344&&n<=65533||n>=65536&&n<=1114111)&&(t+=r)}return t}function y(e){return v(e).replace(/[&<>"']/g,t=>C[t]??t)}function U(e,t){return[...e].filter(n=>!w.has(n)).join(``).trim().slice(0,31)||`Sheet${t+1}`}function g(e){let t=``,r=e;for(;r>=0;)t=String.fromCharCode(65+r%26)+t,r=Math.floor(r/26)-1;return t}function T(e,t){let r=b[e.style??`default`],n=e.value;return n===null||n===``?`<c r="${t}" s="${r}"/>`:typeof n==`number`&&Number.isFinite(n)?`<c r="${t}" s="${r}"><v>${n}</v></c>`:`<c r="${t}" s="${r}" t="inlineStr"><is><t xml:space="preserve">${y(String(n))}</t></is></c>`}function $(e){let t=Math.max(1,e.columns.length),r=g(t-1),n=Math.max(1,e.rows.length),p=e.rows.map((i,o)=>{let s=o+1;return`<row r="${s}">${i.map((c,a)=>T(c,`${g(a)}${s}`)).join(``)}</row>`}).join(``),f=e.columns.map((i,o)=>`<col min="${o+1}" max="${o+1}" width="${i}" customWidth="1"/>`).join(``),d=[...e.merges??[]];for(let[i,o]of e.rows.entries()){let s=o[0];o.length===1&&s!==void 0&&s.style!==void 0&&I.has(s.style)&&t>1&&d.push(`A${i+1}:${r}${i+1}`)}let m=d.length>0?`<mergeCells count="${d.length}">${d.map(i=>`<mergeCell ref="${i}"/>`).join(``)}</mergeCells>`:``;return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<dimension ref="A1:${r}${n}"/>
<sheetViews><sheetView workbookViewId="0">${e.freezeRows!==void 0&&e.freezeRows>0?`<pane ySplit="${e.freezeRows}" topLeftCell="A${e.freezeRows+1}" activePane="bottomLeft" state="frozen"/>`:``}</sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
<cols>${f}</cols>
<sheetData>${p}</sheetData>
${e.autoFilterHeaderRow!==void 0&&e.autoFilterHeaderRow>0?`<autoFilter ref="A${e.autoFilterHeaderRow}:${r}${n}"/>`:``}
${m}
<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
</worksheet>`}function S(e){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="3">
<numFmt numFmtId="164" formatCode="#,##0.00"/>
<numFmt numFmtId="165" formatCode="#,##0.00 &quot;${y(e)}&quot;"/>
<numFmt numFmtId="166" formatCode="0.0%"/>
</numFmts>
<fonts count="9">
<font><sz val="11"/><color rgb="FF0F172A"/><name val="Calibri"/><family val="2"/></font>
<font><b/><sz val="16"/><color rgb="FF0F172A"/><name val="Calibri"/><family val="2"/></font>
<font><sz val="10"/><color rgb="FF64748B"/><name val="Calibri"/><family val="2"/></font>
<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font>
<font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font>
<font><sz val="10"/><color rgb="FF334155"/><name val="Calibri"/><family val="2"/></font>
<font><b/><sz val="10"/><color rgb="FF0F172A"/><name val="Calibri"/><family val="2"/></font>
<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font>
<font><i/><sz val="9"/><color rgb="FF64748B"/><name val="Calibri"/><family val="2"/></font>
</fonts>
<fills count="6">
<fill><patternFill patternType="none"/></fill>
<fill><patternFill patternType="gray125"/></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF0F172A"/><bgColor indexed="64"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF10B981"/><bgColor indexed="64"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFECFDF5"/><bgColor indexed="64"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF047857"/><bgColor indexed="64"/></patternFill></fill>
</fills>
<borders count="2">
<border><left/><right/><top/><bottom/><diagonal/></border>
<border>
<left style="thin"><color rgb="FFE2E8F0"/></left>
<right style="thin"><color rgb="FFE2E8F0"/></right>
<top style="thin"><color rgb="FFE2E8F0"/></top>
<bottom style="thin"><color rgb="FFE2E8F0"/></bottom>
<diagonal/>
</border>
</borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="17">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
<xf numFmtId="0" fontId="4" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1"/>
<xf numFmtId="164" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1"/>
<xf numFmtId="165" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1"/>
<xf numFmtId="166" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1"/>
<xf numFmtId="0" fontId="6" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="164" fontId="6" fillId="4" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="165" fontId="6" fillId="4" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="0" fontId="7" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="164" fontId="7" fillId="5" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="165" fontId="7" fillId="5" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="166" fontId="7" fillId="5" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1"/>
<xf numFmtId="0" fontId="8" fillId="0" borderId="0" xfId="0" applyFont="1"/>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`}function k(e){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>${e.map((r,n)=>`<sheet name="${y(U(r.name,n))}" sheetId="${n+1}" r:id="rId${n+1}"/>`).join(``)}</sheets>
</workbook>`}function X(e){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${Array.from({length:e},(r,n)=>`<Relationship Id="rId${n+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${n+1}.xml"/>`).join(``)}
<Relationship Id="rId${e+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`}function A(e){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
${Array.from({length:e},(r,n)=>`<Override PartName="/xl/worksheets/sheet${n+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join(``)}
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`}function D(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`}function P(e){let t=new Date().toISOString();return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>${y(e)}</dc:title>
<dc:creator>Daily milk</dc:creator>
<cp:lastModifiedBy>Daily milk</cp:lastModifiedBy>
<dcterms:created xsi:type="dcterms:W3CDTF">${t}</dcterms:created>
<dcterms:modified xsi:type="dcterms:W3CDTF">${t}</dcterms:modified>
</cp:coreProperties>`}function R(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
<Application>Daily milk</Application>
<DocSecurity>0</DocSecurity>
<ScaleCrop>false</ScaleCrop>
<LinksUpToDate>false</LinksUpToDate>
<SharedDoc>false</SharedDoc>
<HyperlinksChanged>false</HyperlinksChanged>
<AppVersion>3.0</AppVersion>
</Properties>`}var E=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t+=1){let r=t;for(let n=0;n<8;n+=1)r=(r&1)===1?3988292384^r>>>1:r>>>1;e[t]=r>>>0}return e})();function B(e){let t=4294967295;for(let r of e)t=(E[(t^r)&255]??0)^t>>>8;return(t^4294967295)>>>0}function N(e){let t=new TextEncoder,r=[],n=[],p=0;for(let o of e){let s=t.encode(o.name),x=B(o.data),c=new Uint8Array(30+s.length+o.data.length),a=new DataView(c.buffer);a.setUint32(0,67324752,!0),a.setUint16(4,20,!0),a.setUint16(6,2048,!0),a.setUint16(8,0,!0),a.setUint16(10,0,!0),a.setUint16(12,33,!0),a.setUint32(14,x,!0),a.setUint32(18,o.data.length,!0),a.setUint32(22,o.data.length,!0),a.setUint16(26,s.length,!0),a.setUint16(28,0,!0),c.set(s,30),c.set(o.data,30+s.length);let h=new Uint8Array(46+s.length),l=new DataView(h.buffer);l.setUint32(0,33639248,!0),l.setUint16(4,20,!0),l.setUint16(6,20,!0),l.setUint16(8,2048,!0),l.setUint16(10,0,!0),l.setUint16(12,0,!0),l.setUint16(14,33,!0),l.setUint32(16,x,!0),l.setUint32(20,o.data.length,!0),l.setUint32(24,o.data.length,!0),l.setUint16(28,s.length,!0),l.setUint16(30,0,!0),l.setUint16(32,0,!0),l.setUint16(34,0,!0),l.setUint16(36,0,!0),l.setUint32(38,0,!0),l.setUint32(42,p,!0),h.set(s,46),r.push(c),n.push(h),p+=c.length}let f=n.reduce((o,s)=>o+s.length,0),d=new Uint8Array(22),m=new DataView(d.buffer);m.setUint32(0,101010256,!0),m.setUint16(4,0,!0),m.setUint16(6,0,!0),m.setUint16(8,e.length,!0),m.setUint16(10,e.length,!0),m.setUint32(12,f,!0),m.setUint32(16,p,!0),m.setUint16(20,0,!0);let F=p+f+d.length,u=new Uint8Array(F),i=0;for(let o of[...r,...n,d])u.set(o,i),i+=o.length;return u}function z(e){let t=new TextEncoder;return N([{name:`[Content_Types].xml`,data:t.encode(A(e.sheets.length))},{name:`_rels/.rels`,data:t.encode(D())},{name:`xl/workbook.xml`,data:t.encode(k(e.sheets))},{name:`xl/_rels/workbook.xml.rels`,data:t.encode(X(e.sheets.length))},{name:`xl/styles.xml`,data:t.encode(S(e.currencyCode))},...e.sheets.map((n,p)=>({name:`xl/worksheets/sheet${p+1}.xml`,data:t.encode($(n))})),{name:`docProps/core.xml`,data:t.encode(P(`Daily milk — Milk Purchase Statement`))},{name:`docProps/app.xml`,data:t.encode(R())}])}function V(e){let t=z(e);return new Blob([t.buffer],{type:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`})}export{V as t};