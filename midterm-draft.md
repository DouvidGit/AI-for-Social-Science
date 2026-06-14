## Title

**Everyone Lines Up There: An Interactive Online Queue Simulation**

Presenter: Zichen Lu

Research Advisor: Lawted Wu

This project is about a very small everyday decision: choosing a line. In real life, we often see one line that is much longer than the others. A short line may look faster, but a long line may look more reliable. My project studies how high school students respond to that social signal.

## Research Question & Hypothesis

Research Question: How do differences in visible queue length in an interactive online queue simulation affect high school students' line choice?

Hypothesis: I hypothesize that when one line is visibly more crowded while all other factors are identical, high school students will be more likely to choose the crowded line over shorter lines because they treat others' choices as a signal of reliability.

## Background

Queuing is a simple part of daily life. We line up for school events, food, tickets, services, and public spaces. Most of the time, we do not have full information. We do not know which line is fastest, which line is correct, or whether other people know something we do not know.

In these moments, other people's choices become information. If many people stand in one line, we may think that line is safer, more correct, or more trustworthy. This is a small example of social influence. It matters because many online platforms also show similar signals: likes, downloads, ratings, views, and popularity labels.

My project turns this everyday situation into a small interactive website. The user sees three lines for the same event entrance. One line is visibly more crowded. The user chooses a line and then explains why. The goal is not to prove that people are irrational. The goal is to understand when people use crowd size as a social cue.

## Literature Review

Bikhchandani, Hirshleifer, and Welch (1992) explain informational cascades. Their theory shows that people may follow earlier choices because those choices seem to contain information. This helps explain why a long line may look reliable. However, the theory is broad. It does not tell us how teenagers respond to a simple visual queue on a website.

Banerjee (1992) also studies herd behavior. His model shows that people may rationally follow a group even when the group choice is not always best. This supports my idea that choosing a crowded line is not automatically foolish. It may be a way to use other people's behavior as evidence. But the model is not about interface design or online simulations.

Salganik, Dodds, and Watts (2006) ran a large online experiment in a music market. They found that showing social information, such as download counts, changed what people chose and made outcomes less predictable. This is close to my project because both use online social signals. My project applies this idea to queue length instead of music popularity.

Cai, Chen, and Fang (2009) used a field experiment in restaurants. They found that showing popular dishes increased demand for those dishes. This suggests that people use other customers' choices as quality information. My project asks a similar question in a queue setting: does a crowded line signal reliability?

Zhou and Soman (2003) studied the psychology of waiting lines. Their work shows that queues are not only about time. They also create social comparison and emotional reactions. This is important for my project because a queue is both a waiting system and a social scene.

These studies show that social information can shape choices. What remains less clear is how visible queue length works in a simple online artifact. A long line can mean two opposite things at the same time: more waiting cost, but also stronger social proof. My project focuses on this tension.

## Research Design / Method

My artifact is an interactive online queue simulation called "Everyone Lines Up There." It is a single-page website. Users see three lines for the same event entrance. The rules are the same for all lines. One line has more people than the other two.

The target users are mainly high school students. I may also collect feedback from teachers, parents, or other online visitors, but the main group is high school students.

The current MVP has a short flow. First, the user opens the website. Second, the user sees the three lines. Third, the user chooses one line. Fourth, the user answers why they chose it and whether they noticed that one line had more people. The website records the selected line, the crowded line, whether the selected line was crowded, the reason text, response time, and device type.

For analysis, I will first compare how often users choose the crowded line versus the shorter lines. Then I will read the written reasons and code them into simple categories, such as reliability, speed, random choice, visual preference, or following others. I will also look at whether users say they noticed the crowded line.

## Research Plan & Challenges

By June 14, I have finished the MVP website, deployed it online, and written the first research question and hypothesis. I have also collected background sources about herd behavior, informational cascades, online social influence, and queue psychology.

Before June 20, I will prepare the midterm defense slides and test the website with a few classmates informally. This is only for usability checking, not for final results.

After the midterm defense, I plan to improve the experiment design. The next step is to add a more controlled version, such as a balanced condition where the three lines have similar lengths. This will help me compare behavior when there is no strong crowd signal.

In early July, I plan to run a small user study with high school students. I will share the website link, collect responses, and export the recorded feedback. In mid to late July, I will analyze the choices and written explanations. After that, I will connect the findings to the literature and write the final paper.

The main challenge is control. Users may choose a line because of position, layout, color, or habit, not because of queue length. To reduce this problem, I need to keep the three lines visually similar and randomize where the crowded line appears. Another challenge is interpretation. If users choose the crowded line, I cannot simply say they are "following blindly." They may be making a reasonable inference from social information.

## Expected Results — user study not yet run

The user study has not been run yet, so I do not have results, percentages, graphs, or conclusions.

I expect that some high school students will choose the crowded line even though shorter lines are available. I expect many of them to explain this choice by saying the crowded line looks more reliable, safer, or more likely to be correct.

I also expect that some users will choose the shorter line because they care more about speed and waiting time. This will be useful because it shows the tension inside the decision: social proof points toward the long line, while waiting cost points toward the short line.

My strongest expected result is not just a click pattern. I hope the written reasons will show how students interpret queue length. If they mention words like "reliable," "popular," "correct," or "everyone is there," that would support the idea that visible queue length acts as a social cue.

## References

Banerjee, A. V. (1992). A simple model of herd behavior. *The Quarterly Journal of Economics, 107*(3), 797-817. https://doi.org/10.2307/2118364

Bikhchandani, S., Hirshleifer, D., & Welch, I. (1992). A theory of fads, fashion, custom, and cultural change as informational cascades. *Journal of Political Economy, 100*(5), 992-1026. https://doi.org/10.1086/261849

Cai, H., Chen, Y., & Fang, H. (2009). Observational learning: Evidence from a randomized natural field experiment. *American Economic Review, 99*(3), 864-882. https://doi.org/10.1257/aer.99.3.864

Salganik, M. J., Dodds, P. S., & Watts, D. J. (2006). Experimental study of inequality and unpredictability in an artificial cultural market. *Science, 311*(5762), 854-856. https://doi.org/10.1126/science.1121066

Zhou, R., & Soman, D. (2003). Looking back: Exploring the psychology of queuing and the effect of the number of people behind. *Journal of Consumer Research, 29*(4), 517-530. https://doi.org/10.1086/346247

## Acknowledgements

I would like to thank my research advisor, Lawted Wu, for pushing me to make the project smaller, clearer, and more testable.

I also appreciate the feedback that helped me separate a fun website idea from a real research question.
