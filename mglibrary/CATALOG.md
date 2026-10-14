# BombBomb Motion Library

Use these as creative references, not exact-copy instructions. Adapt to content, spoken cues, face-safe space, and the approved brand. Code is optional scaffolding.

Previews: 6 seconds, silent, 960×540, 30 fps. Editable sources: 1920×1080. Demo captions and sample graphics do not match the sample speech. Arial is the fallback for Arial Nova. Entries are demonstrations awaiting creative review, not newly approved standing rules.

## Opening title (opening-title)

- Category: Titles & emphasis
- Intent: Introduce the idea with a confident, brief title, then return to the presenter.
- Best for: Opening a topic or chapter.
- Guidance: Keep the headline short; let it read before returning to the speaker.
- Adapt: Title, subtitle, alignment, hold, entrance and exit.
- Preview: site/media/opening-title.mp4
- Source: src/Demos.tsx → TitleScene
- Status: Demo; version 1.0.0

## Presenter lower third (presenter-lower-third)

- Category: Titles & emphasis
- Intent: An accent rule enters first, followed by the presenter name and a smaller supporting line.
- Best for: Identifying a speaker without interrupting the video.
- Guidance: Keep the label away from the face and gestures; use only a confirmed job title.
- Adapt: Name, supporting line, corner, color and timing.
- Preview: site/media/presenter-lower-third.mp4
- Source: src/Demos.tsx → LowerThirdScene
- Status: Demo; version 1.0.0

## Stage tracker (stage-tracker)

- Category: Steps & diagrams
- Intent: A three-stage rail stays visible and shifts emphasis to the current step.
- Best for: Returning to a framework throughout an explanation.
- Guidance: Preserve stage order and reconnect each highlight to the spoken cue.
- Adapt: Stage labels, active step, position and cue times.
- Preview: site/media/stage-tracker.mp4
- Source: src/Demos.tsx → TrackerScene
- Status: Demo; version 1.0.0

## Clean split screen (clean-split)

- Category: Presenter layouts
- Intent: The presenter shares the canvas with a clean message panel.
- Best for: Keeping human connection while explaining one strong idea.
- Guidance: Reframe the video to preserve the face; never stretch it to fill the card.
- Adapt: Panel side, headline, detail and presenter crop.
- Preview: site/media/clean-split.mp4
- Source: src/Demos.tsx → SplitScene
- Status: Demo; version 1.0.0

## Patterned editorial split (editorial-split)

- Category: Presenter layouts
- Intent: A rounded presenter card sits beside a numbered message rail on a subtle grid.
- Best for: Explaining two to four ordered ideas.
- Guidance: Reveal the current idea on its spoken cue and dim earlier items gently.
- Adapt: Headline, steps, side, reveal times and crop.
- Preview: site/media/editorial-split.mp4
- Source: src/Demos.tsx → PatternedEditorialSplit
- Status: Demo; version 1.0.0

## Process cards (process-cards)

- Category: Steps & diagrams
- Intent: Three numbered cards appear in sequence with a restrained upward settle.
- Best for: Breaking a process into memorable steps.
- Guidance: Keep each step concise and allow reading time before the next reveal.
- Adapt: Step count, labels, details and cue times.
- Preview: site/media/process-cards.mp4
- Source: src/Demos.tsx → ProcessScene
- Status: Demo; version 1.0.0

## Hand-drawn flowchart (sketch-flow)

- Category: Steps & diagrams
- Intent: Sketch-style boxes and arrows build a clear left-to-right relationship.
- Best for: Explaining progression, handoffs or relationships.
- Guidance: Draw a connection after its source is readable; favor two to four nodes.
- Adapt: Node copy, positions, connectors and sketch speed.
- Preview: site/media/sketch-flow.mp4
- Source: src/Demos.tsx → HandDrawnFlowchart
- Status: Demo; version 1.0.0

## Highlight captions (highlight-captions)

- Category: Captions
- Intent: A colored field follows the active word inside a short phrase.
- Best for: Selective emphasis or sustained caption readability.
- Guidance: Replace demonstration timestamps with the actual edited words; keep hands and face clear.
- Adapt: Words, timestamps, phrase length, position and highlight.
- Preview: site/media/highlight-captions.mp4
- Source: src/Demos.tsx → CaptionHighlight
- Status: Demo; version 1.0.0

## Glitch captions (glitch-captions)

- Category: Captions
- Intent: Short phrases use a restrained chromatic fringe and scanline treatment.
- Best for: An occasional energetic or disruptive statement.
- Guidance: Use selectively; this silent demo is not synchronized to the sample presenter speech.
- Adapt: Words, timestamps, fringe colors, intensity and position.
- Preview: site/media/glitch-captions.mp4
- Source: src/Demos.tsx → CaptionGlitchRgb
- Status: Demo; version 1.0.0

## Comparison / transformation (comparison)

- Category: Steps & diagrams
- Intent: Two contrasting states arrive in order and connect through an arrow.
- Best for: Before and after, alternatives or a shift in thinking.
- Guidance: Use balanced visual weight; clearly identify illustrative comparisons.
- Adapt: Labels, details, emphasis, arrow and reveal order.
- Preview: site/media/comparison.mp4
- Source: src/Demos.tsx → ComparisonScene
- Status: Demo; version 1.0.0

## Key-message callout (key-message)

- Category: Titles & emphasis
- Intent: One short phrase becomes the visual focus with a restrained accent underline.
- Best for: Landing the most important line in a passage.
- Guidance: Give the idea room; remove supporting decoration that competes with it.
- Adapt: Phrase, emphasis, position and hold.
- Preview: site/media/key-message.mp4
- Source: src/Demos.tsx → KeyMessageScene
- Status: Demo; version 1.0.0

## Full-screen concept (concept-scene)

- Category: Steps & diagrams
- Intent: A central idea connects to three supporting pillars across the full canvas.
- Best for: A framework or metaphor that needs more space.
- Guidance: Use the full frame when a small overlay cannot communicate the idea clearly.
- Adapt: Central idea, pillars, relationships and sequence.
- Preview: site/media/concept-scene.mp4
- Source: src/Demos.tsx → ConceptScene
- Status: Demo; version 1.0.0

## B-roll insert (broll-insert)

- Category: Media showcases
- Intent: A supporting motion insert takes over from the presenter and then returns.
- Best for: Showing the thing being discussed while narration continues.
- Guidance: This demo uses an original animated landscape; replace it with relevant supplied footage.
- Adapt: Clip, crop, takeover timing and optional inset.
- Preview: site/media/broll-insert.mp4
- Source: src/Demos.tsx → BrollScene
- Status: Demo; version 1.0.0

## Closing / CTA card (closing-cta)

- Category: Titles & emphasis
- Intent: A clear question resolves into one square-cornered action treatment.
- Best for: Ending with a specific next step.
- Guidance: Use one action and leave enough time to read; no unapproved logos.
- Adapt: Question, action, background and hold.
- Preview: site/media/closing-cta.mp4
- Source: src/Demos.tsx → CtaScene
- Status: Demo; version 1.0.0

## Panel / push / mask (panel-transition)

- Category: Transitions & camera
- Intent: A branded panel sweeps across the canvas to reveal the next layout.
- Best for: Moving between ideas or visual contexts.
- Guidance: Keep the transition brief and motivated by the edit.
- Adapt: Direction, panel color, duration and incoming scene.
- Preview: site/media/panel-transition.mp4
- Source: src/Demos.tsx → TransitionScene
- Status: Demo; version 1.0.0

## Presenter side swap (presenter-side-swap)

- Category: Transitions & camera
- Intent: The same live presenter card crosses from right to left as the text changes sides.
- Best for: Maintaining continuity while a supporting idea changes.
- Guidance: Keep the same video playing; clear outgoing text before the card crosses it.
- Adapt: Start and end rectangles, text and travel time.
- Preview: site/media/presenter-side-swap.mp4
- Source: src/Demos.tsx → PresenterCardMorph
- Status: Demo; version 1.0.0

## Full-screen → corner PiP (corner-pip)

- Category: Presenter layouts
- Intent: The presenter shrinks into a lower corner, revealing a supporting graphic, then returns.
- Best for: Letting the graphic lead while keeping the speaker present.
- Guidance: Place the PiP over verified empty space; preserve playback and face framing.
- Adapt: Corner, size, graphic, timing and crop.
- Preview: site/media/corner-pip.mp4
- Source: src/Demos.tsx → FullFramePresenterBridge
- Status: Demo; version 1.0.0

## PiP → split expansion (pip-to-split)

- Category: Transitions & camera
- Intent: A small presenter window moves and expands into a large split-screen card.
- Best for: Bringing attention back toward the speaker.
- Guidance: Preserve the face anchor and video aspect ratio through the move.
- Adapt: Start and end rectangles, crop and travel time.
- Preview: site/media/pip-to-split.mp4
- Source: src/Demos.tsx → PresenterCardMorph
- Status: Demo; version 1.0.0

## Systems diagram (systems-diagram)

- Category: Steps & diagrams
- Intent: Cards and animated paths reveal a process with a returning feedback connection.
- Best for: Explaining a system, feedback loop or connected workflow.
- Guidance: Keep the reading order obvious and the labels short.
- Adapt: Nodes, paths, markers, reveal order and optional PiP.
- Preview: site/media/systems-diagram.mp4
- Source: src/Demos.tsx → EditorialSystemsDiagram
- Status: Demo; version 1.0.0

## Dual showcase (dual-showcase)

- Category: Media showcases
- Intent: Two large media cards appear on either side of the presenter.
- Best for: Showing two distinct examples together.
- Guidance: Use actual media in production and preserve readability in both cards.
- Adapt: Media, labels, card sizes and separate reveal times.
- Preview: site/media/dual-showcase.mp4
- Source: src/Demos.tsx → DualShowcase
- Status: Demo; version 1.0.0

## Primary media + PiP (primary-media)

- Category: Media showcases
- Intent: A large editorial sample board fills the frame with a rounded presenter window.
- Best for: Giving media the main role while preserving human connection.
- Guidance: Place PiP over dead space and keep the detail being discussed readable.
- Adapt: Media, card size, PiP corner, crop and reveal times.
- Preview: site/media/primary-media.mp4
- Source: src/Demos.tsx → PrimaryMediaShowcase
- Status: Demo; version 1.0.0

## Animated gradient (gradient-full)

- Category: Backgrounds
- Intent: Soft blue fields drift slowly beneath sparse typography.
- Best for: A calm title, key message or closing background.
- Guidance: Keep motion slow and preserve contrast behind the text.
- Adapt: Approved palette, drift, scale and entrance.
- Preview: site/media/gradient-full.mp4
- Source: src/Demos.tsx → MinimalGradientBackground
- Status: Demo; version 1.0.0

## Presenter punch-in / pull-back (camera-punch)

- Category: Transitions & camera
- Intent: A subtle face-centered push holds for emphasis, then returns to the original framing.
- Best for: Emphasizing a line or resetting the visual pace.
- Guidance: Use source-resolution headroom; avoid an arbitrary repeated zoom rhythm.
- Adapt: Scale, focal point, hold and transition speed.
- Preview: site/media/camera-punch.mp4
- Source: src/Demos.tsx → CameraPunch
- Status: Demo; version 1.0.0

## Full-screen → split (full-to-split)

- Category: Presenter layouts
- Intent: The full-screen presenter becomes a larger side card as a message is revealed.
- Best for: Explaining a point while retaining expressive gestures.
- Guidance: Give the presenter more room than a PiP when gestures matter.
- Adapt: Side, split ratio, crop, graphic and timing.
- Preview: site/media/full-to-split.mp4
- Source: src/Demos.tsx → FullFramePresenterBridge
- Status: Demo; version 1.0.0

## Primary media without PiP (media-only)

- Category: Media showcases
- Intent: An editorial sample board takes almost the full canvas with no presenter window.
- Best for: When media readability matters more than a continuous face.
- Guidance: Use the freed space to enlarge meaningful detail.
- Adapt: Media, inset, framing and entrance.
- Preview: site/media/media-only.mp4
- Source: src/Demos.tsx → PrimaryMediaShowcase
- Status: Demo; version 1.0.0

## Primary media + circle PiP (circle-pip)

- Category: Media showcases
- Intent: A circular presenter crop floats in a corner of the main media.
- Best for: A compact human presence beside a screen or document.
- Guidance: Check the circular crop does not cut off the face or cover key content.
- Adapt: Circle size, corner, crop and media.
- Preview: site/media/circle-pip.mp4
- Source: src/Demos.tsx → PrimaryMediaShowcase
- Status: Demo; version 1.0.0

## Floating gradient card (gradient-card)

- Category: Backgrounds
- Intent: A softly moving blue gradient lives inside a rounded editorial card.
- Best for: Containing a title or message on a quiet neutral stage.
- Guidance: Keep important text within the card safe area throughout the motion.
- Adapt: Card proportions, palette, drift and content.
- Preview: site/media/gradient-card.mp4
- Source: src/Demos.tsx → MinimalGradientBackground
- Status: Demo; version 1.0.0

## PiP · one to three (pip-one-to-three)

- Category: Steps & diagrams
- Intent: One source idea branches into three destinations, revealed one at a time while the presenter remains in a lower-corner PiP.
- Best for: Breaking one concept into three categories, choices, outcomes or paths.
- Guidance: Reveal the source first. Start each branch and destination on its own spoken cue; hold prior branches. Keep unrevealed paths completely hidden and reserve clear space for the presenter. The tax labels are an example from the Roth Conversion video.
- Adapt: Title, source image and label, three destination labels and icons, separate cue frames, emphasis, palette, spacing and PiP position.
- Preview: site/media/pip-one-to-three.mp4
- Source: src/Demos.tsx → OneToThreeBranch
- Status: Added by request; version 1.0.0

## Simulated B-camera cutaway (simulated-b-camera)

- Category: Transitions & camera
- Intent: Cut from the original front shot to generated three-quarter side views, then return to the original presenter.
- Best for: A brief alternate interview angle on an emphasized phrase or editorial transition.
- Guidance: Generate from the exact spoken passage. Preserve original audio continuously; mute generated media. Inspect lip sync, identity, eyeline and background. The saved 1080p Seedance test is experimental; do not reuse its speaking footage under unrelated words or describe it as native 4K.
- Adapt: Source passage, angle and side, crop, cue frames, cut duration, generated media offset and return point.
- Preview: site/media/simulated-b-camera.mp4
- Source: src/Demos.tsx → SimulatedBCamera
- Status: Added by request; version 1.0.0

