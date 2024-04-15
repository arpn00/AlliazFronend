import React, { useState } from 'react';
import { Editor, EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { FC } from "react";

interface MyRichTextEditorProps {

  draft : string
}

const MyRichTextEditor: FC<MyRichTextEditorProps> = (props) => {
  const { draft } = props;

  const dummyData = `
  <h1>Bloomberg Market Research Report</h1>
  <p><b>Another week, another step closer to the first rate cut although the disinflation path remains bumpy.</b> With Jeremy Powell stating that interest rates cuts would be appropriate “at some point this year” and Christine Laggard referring to “dialling back monetary restrictions”, markets have priced a near certain first cut in June – as we expect, subject to further data releases until June. Whether the FED or the ECB will cut first remains less clear. Risky assets responded positively to the pending rate cuts, with equities mildly up, whilst credit and EM spreads tightened. On credit, the positive developments at Aareal, NYCB and Pfandbriefbank gave further support.</p></br></br>\n
  <p>As expected, <b>the ECB kept rates unchanged last Thursday</b>. Growth data in the Eurozone strengthened the case for a soft landing scenario, followed by a shy recovery. Powell’s testimony to the Congress also relieved markets, due to fears that the recent upside surprises in inflation could trigger a hawkish shift, though that didn’t happen. Central bankers reemphasised that rate cuts require compelling evidence of disinflation, as avoiding a dovish mistake remains top of mind. Unfortunately, the US job reports last week were “rather ambiguous” (as mentioned by our colleagues in the US): nonfarm payrolls rose 275k in February, above the 200k forecast, but there were 167k of downward revisions to the past two months, so the net improvement was little more than 100k. Still, this was better than the ISM employment indices, which were both in contraction territory. On balance, weaker job reports are consistent with a likely cut in June. Both EUR and USD rates bull flattened during the week, depicting expectations of disinflation amidst slower growth.</p></br></br>
  <p><b>In credit, spreads continued their tightening trend year-to-date, also benefiting from the positive developments at Aareal, NYCB and Pfandbriefbank.</b> These smaller lenders specialised in real estate made headlines as higher interest rates reduced real estate valuations, leading to substantially higher provisions. Pfandbriefbank’s management statement that “this was the hardest real estate crisis since the GFC”, didn’t exactly soothe the media. However, the earnings & positive outlooks recently announced by Aareal and PBB were well received by investors. The private capital raised by NYCB provided further relief to US regional banks, stemming fears of a March 23 rerun.</p>  </br></br> 
  `; // Repeat the content to reach around 1000 lines

  const [editorState, setEditorState] = useState(() => {
    const blocksFromHTML = convertFromHTML(draft);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  });

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={onChange}
      />
    </div>
  );
};

export default MyRichTextEditor;
