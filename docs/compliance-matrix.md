# Compliance Matrix — Texas & Federal

Classification key: **A** applicable · **P** potentially applicable · **R** recommended practice · **N** not applicable · **L** requires legal determination.

This matrix is a planning tool, not legal advice. No item is asserted as satisfied; each requires review.

## Texas

| Area | Instrument | Class | Notes / action |
| --- | --- | --- | --- |
| Business identity | Texas assumed-name / entity registration | L | Confirm entity, assumed name filing, and tax registration before launch |
| Liability waiver law | Texas common law / Tex. Civ. Prac. & Rem. Code | L | Waiver enforceability is fact-specific; counsel must review W01–W03 |
| Guardian consent limits | Texas family law | L | Guardian authority to consent for minors; scope of waiver for minors |
| Youth sports safety | Texas youth sports safety provisions | P | Emergency action plan, heat policy, safeguarding |
| Emergency protocols | Recommended practice | R | Written EAP, AED access, incident reporting |
| Licensing / scope of practice | Texas Occupations Code | P | No medical/therapy claims; stay within performance coaching |
| Data privacy | Texas Data Privacy and Security Act (TDPSA) | P | Threshold/classification requires legal determination |
| Child privacy | Texas SCOPE Act | L | Whether site is a "covered platform" requires analysis |
| NIL | Texas NIL / UIL rules | P | W08 conditional; UIL amateurism considerations for school athletes |
| School contracting | Texas Education Code / district policy | P | W11 services agreement; district approval required |
| Consumer cancellation / refund | Texas consumer protection | P | W04/W05 must match actual practice |
| Insurance | Commercial general liability / participant accident | R | Confirm coverage before launch; W06 disclosure |

## Federal

| Area | Instrument | Class | Notes / action |
| --- | --- | --- | --- |
| Children's privacy | COPPA | P | Do not collect under-13 data before compliance; registration <13 disabled |
| Advertising / endorsements | FTC Act, endorsement guides | R | No invented testimonials; no equipment endorsement implied |
| Commercial email | CAN-SPAM | A | Inquiry acknowledgments are transactional; include identification and opt-out where required |
| Electronic signatures | ESIGN Act / UETA | P | W13 consent; audit trail required before enabling |
| Disability access | ADA Title III | P | WCAG 2.2 AA target |
| Web accessibility | WCAG 2.2 AA | R | Target and test; no certification claimed |
| Health data | HIPAA | N/L | Not a covered entity as described; document the analysis, do not assume |

## Safeguards mapped to implementation

| Safeguard | Where implemented |
| --- | --- |
| Guardian-led registration | `/registration/parent`, minor flag in athlete form |
| No under-13 collection before COPPA | Registration submission disabled; note in privacy policy |
| Medical data out of analytics/URLs/logs | No medical fields in inquiry forms; forms disabled |
| No sensitive data in localStorage | Forms hold state in memory only |
| No ad pixels on minor pages | No third-party trackers installed |
| Separate required vs optional consent | W07 photo/video is Optional; consent UI separates purposes |
| HIPAA analysis documented | This matrix + privacy policy section 4 |
| Draft waiver labelling | Every waiver page and index |
