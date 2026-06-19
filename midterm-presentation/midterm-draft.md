## Title

**Everyone Lines Up There: An Interactive Online Queue Simulation**

Presenter: Zichen Lu

Research Advisor: Lawted Wu

My project starts with a very common scenario in our daily lives: when we see several lines at an airport, a school event, or another public place, why do we sometimes choose the long one even when shorter lines are available?

This phenomenon interests me, so I made a simplified simulation that helps me study how high school students make this choice when they are in this kind of situation.

## Research Question & Hypothesis

Research Question: How do differences in visible queue length in an interactive online queue simulation affect high school students' line choice?

Hypothesis: I hypothesize that when one line is visibly more crowded while all other factors are identical, high school students will be more likely to choose the crowded line over shorter lines because they treat others' choices as a signal of reliability.

The key word here is "visible." I am not telling users which line is faster, because in real life we often do not get that information directly.

## Background

Imagine this scene. You arrive at a school event. There are three lines at the entrance. One line is much longer than the others. Nobody explains why.

You now have two possible thoughts:

- The short line may save time.
- The long line may be the correct or safer choice.

They may also wonder: maybe the short line is for staff, maybe it is about to close, or maybe other people know something I do not know.

This is a small example of social influence. In real life, we often use other people's behavior as a shortcut when we do not have full information.

This also connects to online life. Likes, views, ratings, downloads, and "most popular" labels all work as social signals. My project studies a simple version of this problem through a queue choice simulation.

The goal is not to say people are foolish for following others. The goal is to understand when "many people are there" becomes a reason to choose. This may help designers reduce bias and improve experience and efficiency.

## Literature Review

Bikhchandani, Hirshleifer, and Welch (1992) explain informational cascades. Their main idea is that people may follow earlier choices because those choices seem to contain information. This helps me think about a long line as a possible information signal.

Banerjee (1992) studies herd behavior. His model suggests that following a group can be rational when people are uncertain. This is important for my project because choosing the crowded line may not be blind following. It may be a way to infer reliability.

Salganik, Dodds, and Watts (2006) ran an online music experiment. They found that social information, such as download counts, changed people's choices. This is close to my project because both use online settings and visible social signals.

Cai, Chen, and Fang (2009) used a restaurant field experiment. They found that showing popular dishes increased demand. This supports the idea that people may use other customers' choices as quality information.

Zhou and Soman (2003) studied the psychology of waiting lines. Their work reminds me that queues are not only about time. A queue is also a social scene, where people compare, infer, and react.

My gap is small but concrete. These studies show that social information matters, but my project asks how one simple visual cue, queue length, affects students inside an interactive website. In later versions, I also want to test when students become more or less influenced by this cue.

## Research Design / Method

My current artifact is a single-page interactive website called "Everyone Lines Up There."

The user sees three lines for the same entrance. The lines have the same rule, same color style, and same basic layout. One line has visibly more people.

The shortest user flow is:

1. Open the website.
2. Look at the three lines.
3. Choose one line.
4. Explain the choice in one sentence.
5. Answer whether they noticed the crowded line.

The future version of the website will record the selected line, the crowded line, whether the user chose the crowded line, response time, device type, and written reason.

To make the study more rigorous, I need to control several things:

- The crowded line should appear in different positions, not always in the middle.
- The three lines should look similar except for the number of people.
- The page should not directly tell users what I am testing.
- Written reasons should be coded into clear categories, such as reliability, speed, random choice, visual preference, and following others.

For the first analysis, I will compare how often users choose the crowded line versus shorter lines. Then I will examine the reasons to see whether users describe the crowded line as more reliable, correct, popular, or safe.

## Research Plan & Challenges

By June 19, I have finished the MVP website and deployed it online. I have also collected sources about herd behavior, social influence, popularity signals, and queue psychology.

For the midterm stage, my goal is to show a clear artifact and a testable research design.

After the midterm, I plan to improve the experiment in these steps:

1. Add a balanced condition where the three lines have similar lengths.
2. Test the website with a small group for usability problems.
3. Run a small user study with high school students and analyze the choices and written reasons.
4. Add more groups to test different variables' effects.

The biggest challenge is control. Users may choose a line because of position, habit, phone screen size, or visual preference. If I ignore these factors, I may mistake a design effect for a social influence effect.

Another challenge is interpretation. If someone chooses the crowded line, I should not simply call it "blind conformity." A more careful interpretation is that the user may treat other people's choices as evidence, and to know this, I'll have to ask them questions and analyze answers.

## Expected Results — user study not yet run

The user study has not been run yet. I do not have real user results, percentages, graphs, or conclusions.

I expect to see two types of choices.

First, some students may choose the crowded line. Their reasons may include words like reliable, correct, popular, safe, or "everyone is there."

Second, some students may choose a shorter line. Their reasons may focus on speed, less waiting, or efficiency.

This tension is the interesting part of the project. The short line gives a possible time advantage. The long line gives a possible social signal. This study asks which signal becomes stronger in this simple situation.

The most useful evidence will not only be the click. It will be the match between the click and the reason. If many crowded-line choices also mention reliability or social proof, that would support my hypothesis.

## References

Banerjee, A. V. (1992). A simple model of herd behavior. *The Quarterly Journal of Economics, 107*(3), 797-817. https://doi.org/10.2307/2118364

Bikhchandani, S., Hirshleifer, D., & Welch, I. (1992). A theory of fads, fashion, custom, and cultural change as informational cascades. *Journal of Political Economy, 100*(5), 992-1026. https://doi.org/10.1086/261849

Cai, H., Chen, Y., & Fang, H. (2009). Observational learning: Evidence from a randomized natural field experiment. *American Economic Review, 99*(3), 864-882. https://doi.org/10.1257/aer.99.3.864

Salganik, M. J., Dodds, P. S., & Watts, D. J. (2006). Experimental study of inequality and unpredictability in an artificial cultural market. *Science, 311*(5762), 854-856. https://doi.org/10.1126/science.1121066

Zhou, R., & Soman, D. (2003). Looking back: Exploring the psychology of queuing and the effect of the number of people behind. *Journal of Consumer Research, 29*(4), 517-530. https://doi.org/10.1086/346247

## Acknowledgements

I would like to thank my research advisor, Lawted Wu, for pushing me to make the project smaller, clearer, and more testable.

I also used AI tools to help organize drafts and build the prototype, but I am responsible for the research question, design choices, and final interpretation.

I also appreciate the feedback that helped me turn a fun website idea into a more careful research design.
