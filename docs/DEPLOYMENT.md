# Hosting, custom domain, and recovery

## What this deployment does

The workflow builds this website repository and uploads **`dist/`** to GitHub Pages. The separate presentation and source documentation are not included. Commands in this guide run from this repository's root, where `package.json` lives. There is no application server to keep running. The workflow is supplied but no Git repository or deployment has been created for you.

GitHub Pages hosting can be $0 using an eligible public repository on GitHub Free, within current terms and usage limits. Private-repository Pages availability depends on the plan. Domain registration/renewal is separate. Check the current official documentation before making financial or operational commitments:

- [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Custom GitHub Actions workflows for Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## 1. Put the source in a repository

Create a repository controlled by the association where practical. A normal repository such as `rw-muda` gives a project URL like `https://ACCOUNT.github.io/rw-muda/`. An account-site repository named `ACCOUNT.github.io` uses the domain root.

Review the files before publishing. The organization is real, but the repository remains a public prototype until its real drafts are verified and approved. Never commit credentials, membership lists, private contact details, or filled confidential templates.

Once you have chosen the account and repository, standard commands are:

```sh
git init
git add .
git commit -m "Add Kampung Babakan youth website draft"
git branch -M main
git remote add origin https://github.com/ACCOUNT/REPOSITORY.git
git push -u origin main
```

Replace `ACCOUNT` and `REPOSITORY`; do not copy the placeholder remote unchanged. If the project is already in Git, use its existing remote/history instead of reinitializing it. The development agent has not run these publication commands.

## 2. Enable GitHub Pages

1. Open **Repository → Settings → Pages**.
2. Under build/deployment source, select **GitHub Actions**.
3. Confirm the default branch is `main`, or update the workflow's push branch to match it.
4. Open **Actions → Deploy demo to GitHub Pages** and run it manually if enabling Pages happened after the first push.
5. Watch the `build` and `deploy` jobs. The deployed URL appears in the deployment environment and Pages settings.
6. Open that URL and check the public site, images, navigation, and font-license link.

The workflow uses Node 22, runs `npm ci`, `npm test`, and `npm run build`, then uploads only `dist/`. Its built-in `GITHUB_TOKEN` has the Pages and identity permissions needed for deployment; you do not need to paste a personal token into the repository.

GitHub environment protection settings can require an owner to approve deployments. If a run waits for review, inspect the `github-pages` environment configuration.

## 3. Verify the repository subpath

This prototype uses relative asset paths and relative links. It should work at both a custom-domain root and a project path. Do not replace links with `/images/...` or other root-absolute paths; a leading slash would bypass the repository path. Toolkit and presentation are not public routes.

Local production verification:

```sh
npm run build
npm run preview
```

The Playwright check additionally serves the production site at `/rw-demo/` to exercise this case. Activity-page directory routes use trailing slashes, e.g. `.../pemuda-babakan/kegiatan/gotong-royong-lingkungan/`.

## 4. Add a custom domain when ready

First agree the domain spelling, registrar account owner, renewal budget, and backup access. Buy it through the association's approved process. The domain does not have to be purchased to review or launch the demo URL.

Follow GitHub's current setup instructions:

- [Manage a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verify the custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Secure the site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

Recommended sequence:

1. Verify domain ownership with GitHub using its prescribed DNS TXT record.
2. Set the custom domain in repository **Settings → Pages** before directing traffic there.
3. For a subdomain such as `www.example.org`, create a DNS CNAME pointing to `ACCOUNT.github.io` — no `https://` and no repository suffix.
4. For an apex domain such as `example.org`, use the current A/AAAA or supported ALIAS/ANAME instructions in GitHub's documentation. Do not hardcode IP addresses from an old guide.
5. If using both apex and `www`, configure both according to GitHub's guide and choose the primary domain in Pages settings.
6. Optionally track the approved hostname in `public/CNAME` as one bare line. Vite copies it to `dist/CNAME`. For this custom Actions workflow, configure the domain in Pages settings as well; a file alone is not the setup process.
7. Wait for DNS and certificate provisioning, then enable **Enforce HTTPS** when available.
8. Check the root page, nested pages, redirects, asset paths, and certificate from another network/device.

Example `public/CNAME` content, **only after replacing it with your actual approved domain**:

```text
www.example.org
```

No CNAME file is included now because no real domain has been provided. DNS propagation can take time; inspect current records and Pages status rather than repeatedly changing settings.

## Updating and rollback

### Routine update

1. Edit source and any relevant documentation.
2. Run `npm test` and `npm run build`; run browser checks after layout/interaction changes.
3. Preview the change and have the content owner verify it.
4. Commit and push to the configured deployment branch.
5. Confirm the workflow completes and check the live URL.

### Restore a bad content/code release

1. Identify the problematic commit and the last known-good source revision.
2. Prefer a normal `git revert COMMIT` for a discrete bad change, then push the revert so the deployment workflow publishes the correction.
3. If multiple related changes are involved, review the full range before reverting; preserve later valid content.
4. Run the checks and verify the live result after redeployment.

For immediate content errors, publish a clear correction rather than waiting for a larger release. A domain/DNS problem is fixed through the registrar and Pages configuration, not by changing CSS or forcing a code rollback.

### Build/deploy failure

- **`npm ci` fails:** inspect the lockfile and Node version; reproduce locally.
- **Content check fails:** fix the field/path/reference named in the error.
- **Build fails:** open the build log; check imports, missing assets, and HTML entry points.
- **Configure/deploy Pages fails:** verify Pages source is Actions, required permissions, and environment settings.
- **Deployment succeeds but files 404:** check the published URL and relative paths; ensure the complete `dist/` output was uploaded.
- **Only custom domain fails:** check DNS, verification, certificate status, and the Pages custom-domain setting.

## Move to another static host or on-premises server

1. Build from the version you intend to publish.
2. Copy the complete contents of `dist/` to a static document root.
3. Configure the host to serve directory `index.html` files, MIME types, and HTTPS.
4. Check public pages and assets. There is no SPA fallback requirement; serve real files and normal 404s.
5. Validate the candidate host before changing production DNS.
6. Keep the previous deployment available until the new host and certificate are verified.
7. Transfer DNS, monitor the site, and retain a tested rollback path.

No application process or Node installation is required on that static server. Future APIs should be separate repositories and deployments with their own operators and recovery plans. The general-documentation repository records that wider architecture.

## Release verification

- [ ] Public pages and assets load under the real URL; the deployment uses only the landing-page output.
- [ ] No missing local images, fonts, or browser-console errors.
- [ ] Navigation, filter, dialog close/Escape, and message download work.
- [ ] Phone layout has no horizontal overflow.
- [ ] Real-release content and contact routes have been reviewed by their owners.
- [ ] Search metadata matches prototype/draft/official status and the site's evergreen profile purpose.
- [ ] HTTPS and expected redirects work if a custom domain is used.
- [ ] Current source revision and known-good rollback are recorded.
