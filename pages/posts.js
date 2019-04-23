import React, { Component } from "react";

export default class extends Component {
  static getInitialProps({ query: { id } }) {
    return { postId: id };
  }

  render() {
    return (
      <div>
        <h1>My blog post #{this.props.postId}</h1>
        <p>
          Ever since the late 1970s, America’s Liberal nature has been eroded
          through a combination of weaponized cultural resentment (mostly
          right-wing religious hatred) and deregulatory market fundamentalism
          (led by corporate conspiring and abetted by the useful idiots and
          rabid cynics of institutional libertarianism).
          <br />
          This shift has been seen by many ‘normal’ Americans as either
          something to be celebrated, or more often as not something that was
          even happening. America, to these drooling dupes, is a constant force
          of nature that is immutable and static–and no amount of erosion of
          democratic norms could possibly lead to a fascist dystopia. Meanwhile
          the pieces were all being put in place–the Supreme Court eroded many
          hard-fought civil, human and consumer rights (often with weasel
          tactics like questioning standing in an attempt to conceal their deep
          illiberalism) and even appointed a president into office who did not
          win the majority of votes in either the nation or even in the state
          over which the case had been filed.
          <br />
          Pointless military actions from Grenada to Iraq to Libya served to
          excite the dumb with the flashiness of military ceremony while sons
          and daughters were tossed back into their (mostly small-town and
          rural) communities with PTSD and resentment and untreated ills. The
          Senate and House became punch lines, predictable in their mindless
          support of war and their reflexive partisan policy stances.
          <br />
          The biggest problem in this setting is that one of the parties evolved
          from a merely nasty right-wing party into an openly fascist operation
          in the last 15 years–and the dimwitted moron who they nominated in
          2016 won their party by tapping further into the barely-concealed vein
          of hate that had come to fuel it all.
          <br />
          If I have a sense that authority is illegitimate, it is not a
          reflection on me so much as it is an accurate reading of what I see
          around me. Those of my demographic have been endlessly lectured by
          entitled punks and violent idiots that we better get along and go
          along with a nasty, hateful and fundamentally indecent system–no
          matter how bad things get. But those people are cowards.
          <br />
          I have never been afraid of authority. Nothing has changed.
          <br />
          <br />
          <i>
            via ➡️{" "}
            <a href="http://sf3am.com/links/2017/01/31/an-era-of-cowards.html">
              <i>sf3am.com</i>
            </a>
          </i>
        </p>
      </div>
    );
  }
}
