# Learning Journal -

## WEEK1

# 20 May 2026
* Created a private repository on github named 'ecommerce-pms'.
* Cloned the repository to my local machine.
* Established the initial directory structure('client/','server/','docs/').
* Created and formatted the initial 'README.md'.

# 21 May 2026
* Learned about Feature branch, it is like a separate workspace.Instead of changing the main code directly,create a branch to work on one specific new feature.This way,if I make a mistake,the main project stays safe and working.
* A pull request is how I tell my team,"I've finished my work,please check it and add it to the main project."It matters as it allows other people to review my code,find bugs,and make sure everything looks good before it becomes permanent.

# 22 May 2026
* A linter is a tool that scans our code to find technical errors,bugs or suspicious patterns.It is like "spell-checker" for programming logic. Team needs it as it ensures everyone follows the same coding rules.It helps catch "silly" mistakes early before the code is even run.
* Code formatter automatically fixes the visual style of our code(like indentation,spacing and line-breaks).It doesn't care if our code works,it just cares that it looks clean.
* Linter looks for errors and quality while a Formatter looks for layout.
* Husky is a tool that lets you run automated scripts at specific times when using Git. It runs during Git Hooks.Most commonly,it runs at the pre-commit stage.This means when you type git commit ,Husky checks your code first.If the linter finds an error,Husky stops the commit so you can fix it before the "bad" code is saved.
* Today, everything is new to me and it takes time as many errors came but I learned many things.

# 23 May 2026
* Documentation is important as to ensure that all contributors of repo are on the same page,preventing misunderstandings between them.
* Even as a solo developer issue tracking provide a historical record of why decisions were made,not just what changed for future.
* Conventional commits format adds a structured ,human and machine readable layer to git history.

## WEEK2

# 25May 2026
* I built basic page of ecommerce website using HTML like heading,section,lists,forms and button tags.
* I learned HTML already so nothing is new to me today.
* Basic HTML is added,so it was easy.

# 26May 2026
## Week 2, Day 2 — CSS Fundamentals
**What I built:** Today I wrote CSS code for website which includes flexbox,transitions,border and nasic fundamentals of CSS.
**The box model in my own words:**
The box model is like the box in which actual items are present like content,images, the box has border,margin,padding,height and width which can be changed by ourselves in CSS code.
**Flexbox vs the old way:**
Old way is by using percentages to adjust width like width:33.33% while Flexbox is we tell a container to display:flex and it automatically handles the spacing,sizing,and alignment of its children or items.
**My biggest "aha" moment today:**
Using box-sizing:border-box is best option.

# 27May 2026
## Week 2, Day 3 — Tailwind, Responsive Design, Accessibility
**What I built today:**
Built a responsive website using Tailwind CSS,on opening website on mobile phone,tablet and desktop how website will look.
**The shift from yesterday:**
Yesterday I wrote CSS files. Today I wrote utility classes. The difference in how I thought was today I don't need to think about names given to divs or anything like that ,I just have to add inbuilt classes of tailwind as the attributrte of different HTML tags.
**What surprised me about accessibility:**
Accessibility is simple as no need of CSS files ,all classes can be added only in HTML elements itself.
**Where I struggled:**
In adding some CSS properties,I got stucked like what Tailwind classes will suit this property ,so I had to google it. Making responsive design is bit diificult task.

# 28May 2026
* Added main and footer tag in html.

# 29May 2026
## Week 2, Day 4 — Bootstrap & the Two-Framework Problem
**What I built:** 
Today I rebuilt the product grid using Bootstrap, used Bootstrap's grid ( container , row , col ), card component, and btn
classes. In the same html files, added tailwind also to see, which one is better framework to use in real websites(Bootstrap or Tailwind).
**Tailwind vs Bootstrap — my honest take:**
Honestly, I find Bootstrap easier than Tailwind because I used it before, but in real life projects , Tailwind is more useful as unlimited customization can be made in Tailwind and it will be faster once I memorize classes.
**What happened when I loaded both:**
When I loaded both, Tailwind wins and changes implemented written using Tailwind. In short, Tailwind overrides the Bootstrap.
**My architectural recommendation:**
For beginners, Bootstrap is fine for learning and HTML code is clean ,Fastest for standard layouts but harder for customization. My architectural recommendation is to use Tailwind for real life projects and for long term use as Tailwind has the Steep Learning curve for beginners but it will be Faster once you memorize classes and unlimited customization can be made in CSS by using Tailwind.

## Week 3, Day 1 — Entering the React World
**The biggest mental shift today:**
JSX isn't HTML-in-JS, it's JavaScript that compiles to function calls and looks like HTML for ergonomics. It gets transformed into regular JavaScript function calls and designed to look like HTML to make writing I structures more intuitive for developers. It allows us to describe what the UI should look loke within the JavaScript code.
**What "clicked" about JSX:**
JSX stands for JavaScript XML and it allows the developers to write HTML -like code directly inside JavaScript files.
**What surprised me about the Vite setup:**
Setup is rapd and lightweight. The initial setup download takes seconds, Instant server start by typing npm run dev boots the server in milliseconds.
**A concept I want to revisit:**
Need more study of REACT in deep, need more practice.

## Week 3, Day 2 — Components & Props
**The data flow I built today:**
Data starts in products.js, which acts as our "source of truth"(the raw data). I imported that array into App, making it the owner of the data for this exercise. From there, I passed the entire array down to ProductGrid via a prop.
Inside ProductGrid, I used .map() to loop through that array. For every single product object, the grid "spawns" a ProductCard component, passing through product's information down as a prop. It's like a delivery pipeline: the warehouse(App) sends a big crate to the distributor(Grid), who then hands individual packages to the delivery drivers(Cards).
**The `.map()` pattern in my own words:**
Think of a .map() like a copy-paste machiine with a brain. You give a list of data(an array), and you tell it, "For every iten in this list, I want you to transform it into this specific React component." It returns a new list of ready-to-render components. The most inportant thing to remember is that the "brain" needs a unique key for every item it creates so React doesn't get confused about which item is which if things change later.
**Where I tripped up:**
I got stuck trying to access props.name when I already destructured the props object in the function arguments. I had to remind myself :if I use ({name}), I just use name.not props.name .
**One thing I'd refactor if I had time:**
I would destructure the product object earlier in the ProductCard component. Right now, I'm passing the whole object and calling product.title.product.price,etc. It would be much cleaner to destructure those variables at the top of the component so the JSX looks tidier and is easier to read at a glance.

## Week 3, Day 3 — Composition, Events, Spread
**What `children` unlocked for me:**
It's what lets you put one component inside another, like a "box" that can hold any content you drop into it.
**The spread vs explicit choice I made:**
Explicit: Writing out every prop like name={name} age={age}. It's clear but takes a lot of typing.
Spread: Using {...user} to pass everything at once. It's fast but can sometimes hide what data is actually being sent.
I would prefer Spread as it is easier and more suitable for large projects.
**The first time I tried `onClick={handleClick()}` instead of `onClick={handleClick}`:**
When you add the parentheses () , you are telling the code to run the function immediately as soon as the page loads. This often causes errors. When you leave the parentheses off, you are giving React a reference to the function. You're saying, "don't run this now- only run it when the user actually clicks the button."
**Something I'm still fuzzy on:**
State management, when exactly a component re-renders, or how to pass data backup from a child to a parent.

## WEEK 4 DAY 2
# Why I agree with this design "reaching zero with means remove".
I think removing an item when quantity reaches zero is a good user experience because a product with quantity 0 has no meaning in a shopping cart. It reduces clutter and keeps the cart data simple.
Instead of:

[
  { id: 1, quantity: 0 }
]

we store:

[]

which is cleaner and easier to work with.
#The advantage of storing only {id, quantity} in the cart is that product information is not duplicated. Any change to product name, image, or price is automatically reflected in the cart because the sidebar looks up the current product data using the ID. However, this introduces a dependency on the product catalog. If a product is deleted, the lookup returns undefined. I chose to filter out orphaned cart items because products that no longer exist cannot be purchased, and removing them keeps the cart state consistent and avoids confusing users.

## Week 4, Day 3 — Effects & the Outside World
**The infinite-loop bug, in my own words:**
An infinite loop happens when a useEffect updates a state variable, and that state change causes the component to re-render, which runs the effect again, creating a cycle that never ends.
The loop continues forever until React throws an error or the browser becomes unresponsive.
**The cleanup function clicked when:**
The Escape key listener example made it click for me.
At first I thought the cleanup function only runs when a component unmounts.
Then I learned React also runs cleanup before re-running an effect.
Today's work made useEffect feel much more practical.
Before today, I understood that effects were used for side effects, but I didn't really understand why cleanup functions were necessary.
The Escape key listener task made it real for me. I could clearly see how listeners would keep accumulating if I never removed them. The body scroll lock example also helped me understand that effects are not only for fetching data — they're for synchronizing React with anything outside React.
The localStorage task was also useful because it showed how React state can be connected to browser storage and survive page reloads.
**The one thing I'd be careful about with useEffect going forward:**
I would be very careful whenever an effect updates state.
I will immediately check:
Does this need to happen inside an effect?
Is my dependency array correct?
Could this effect trigger itself again?
Because the easiest way to create an infinite loop in React is an effect that updates state without proper dependency management.

## Week 8, Day 2 — Docker Compose

### **What "it works on Compose" actually proved:**

Today I understood that Docker Compose is much more than just starting multiple containers. When my application worked through Docker Compose, it proved that all the services (client, API, and PostgreSQL) were correctly configured and could communicate with each other over Docker's internal network. It also proved that the environment variables, port mappings, named volumes, and service dependencies were configured correctly. Instead of manually starting every service, Compose created a complete development environment with a single command.

### **The healthcheck dependency chain, explained simply:**

A healthcheck is like asking a service, "Are you actually ready to work?" instead of just checking whether it has started.

In my project:
1. Docker starts the PostgreSQL container.
2. PostgreSQL needs a few seconds before it is ready to accept connections.
3. The healthcheck repeatedly checks if PostgreSQL is healthy.
4. Only after the database becomes healthy does Docker Compose start the API container.
5. Once the API is running, the client can successfully make requests to it.

Without this dependency chain, the API might start before PostgreSQL is ready, causing connection errors and application failures.

### **The CMD bug from Day 1 — what I'd check first next time:**

The biggest lesson I learned is to debug containers step by step instead of guessing.

The first commands I would run are:

bash
docker ps -a
This tells me whether the container is still running or if it exited immediately.
If the container exited, I would immediately check its logs:

bash
docker logs <container-id>

The logs usually explain exactly why the container stopped, such as a missing command, an incorrect CMD, missing files, database connection errors, or missing environment variables.
Instead of rebuilding everything repeatedly, I now know that `docker ps -a` and `docker logs` are the fastest way to diagnose Docker problems.

### **Still fuzzy:**

* The difference between build-time variables (`VITE_API_URL`) and runtime environment variables.
* When to use Docker Compose versus running containers individually.
* The complete Docker networking model and how containers discover each other.
* The difference between bind mounts, named volumes, and anonymous volumes.
* How Docker images are promoted from development to production environments.
* Multi-stage Docker builds and how they reduce image size.
* Passing different build arguments for development, staging, and production deployments.
