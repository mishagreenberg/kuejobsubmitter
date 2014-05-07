kuejobsubmitter
===============

command line job submitter for kue

for use with tools like cron

**arguments**

`-u [url]` -> url to kue job endpoint ie https://localhost/job
`-j [jobname]` -> type of job to submit
`-a [action]` -> POST or DELETE, default POST
`-w [delay]` -> delay millis for the job, default 0
`-p [priority]` -> default high
`-n [attempts]` -> number of attempts
`-d` -> indicates to send stdin json data to job, only for POST action
`-i [id]` -> id of job to DELETE, only for DELETE action
