# Security Best Practices

## Common

- The use of innerHtml, outerHtml, write, or writeln is prohibited and can be replaced with innerText.
- The use of `<script>`, `<iframe>`, `<object>`, or `<embed>` should be handled with caution.
- The HTML string must be mandatorily purified before insertion (exemple : DOMPurify)
  - React: `dangerouslySetInnerHTML`
  - Angular: `bypassSecurityTrustHtml`
- The use of HTML inserstion should be minimal and limited to data received from the backend to avoid security issues.
  - React: `dangerouslySetInnerHTML`
  - Angular: `bypassSecurityTrustHtml`
- URLs and links (href or src) must be mandatorily sanitized. Example of a URL sanitizer.
- The use of javascript: or data: is prohibited. Example: `<a href="javascript: alert(1)">`.
- The use of JSON.stringify should be done with caution to avoid dynamic vulnerability injection.
- Verification and securing of input fields (input, textarea, etc.) is very important, especially if the information entered will be sent to the backend.
- The use of LocalStorage, Session, and Cookie should be with caution (no data, sensitive or not, should be saved in the Frontend without the client's consent).
- It is prohibited to leave or store sensitive data (even mocks) in the Frontend or to log sensitive data in the console.
  Is the code defensive (thinking of the worst-case scenario: null, undefined, wrong type, etc.)?
- It is highly recommended to limit the use of external and internal npm modules to those recommended by the Technical Commitee. Create an issue to ask a modification to [Bistro](https://github.com/ekino/bistro/issues)
- It is highly recommended to follow updates made on the Frontend Technical Commitee to avoid obsolescence and vulnerability risks.
- Do not rely solely on the Frontend for everything: Security, Business Rules, Rendering, Performance, etc. (it is easy to bypass the Frontend with a simple "inspect" or "spy" on requests).

## React

- The use of these React capabilities is prohibited: `findDOMNode`, `createElement`, `createFactory`, and `cloneElement`.
- React capabilities `useRef` and `createRef` should not be used with innerHtml or outerHtml.

## Resources

For further reading and resources on web security, refer to:

- [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)
- [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#html-sanitization)
- [Pragmatic Web Security / Articles](https://pragmaticwebsecurity.com/articles)
- [Pragmatic Web Security / Conferences](https://pragmaticwebsecurity.com/talks)
- [Avoiding XSS in React applications](https://pragmaticwebsecurity.com/files/cheatsheets/reactxss.pdf)
- [Secure data storage in the browser](https://pragmaticwebsecurity.com/files/cheatsheets/browsersecrets.pdf)
- [deepscan Rules](https://deepscan.io/rules/)
- [bearer Rules](https://docs.bearer.com/reference/rules/?lang-jsts=javascript)
- [CWE Top 25 Most Dangerous Software Weaknesses](https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html)

Additionally, recommended books:
- [Security for Web Developers: Using JavaScript, HTML, and CSS](https://www.amazon.com/Security-Web-Developers-Using-JavaScript/dp/1491928646)
- [Web Application Security: Exploitation and Countermeasures for Modern Web Applications](https://www.amazon.com/Web-Application-Security-Exploitation-Countermeasures/dp/1492053112)
