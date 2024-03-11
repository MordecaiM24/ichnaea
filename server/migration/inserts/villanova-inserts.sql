INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Villanova University', 'Villanova', 'villanova', 'Villanova, PA', 'Suburban', 260, 51, 23, 6989, 64906, 34784, 'Private', 1390, 1440, 1480, 32, 33, 34);
-- Deadline 1 for Villanova University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'regularDecision', '2024-01-16T00:00:00.000Z', 'Regular Decision', '2024-01-16T00:00:00.000Z');
-- Deadline 2 for Villanova University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Early Action', '2023-12-02T00:00:00.000Z');
-- Deadline 3 for Villanova University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-16T00:00:00.000Z');
-- Deadline 4 for Villanova University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'earlyDecision2', '2024-01-16T00:00:00.000Z', 'Early Decision II', '2024-01-16T00:00:00.000Z');
-- Supplemental Essay 1 for Villanova University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'St. Augustine states that well-being is “not concerned with myself alone, but with my neighbor’s good as well.”  How have you advocated for equity and justice in your communities?', 250);
-- Supplemental Essay 2 for Villanova University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'As an Augustinian community, we believe that you should see people for who they are. Please share with us a time when you were misjudged based on your identity or background.', 250);
-- Supplemental Essay 3 for Villanova University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'In the Villanova community, we learn from one another. What is a lesson in life that you have learned that you would want to share with others? ', 250);
-- Supplemental Essay 4 for Villanova University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'At Villanova, we often say “each of us strengthens all of us.” In a time of personal challenges, how do you borrow from the strength of others?', 250);
-- Supplemental Essay 5 for Villanova University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Villanova University'), 'Why do you want to call Villanova your new home and become part of our community? Please respond in about 150 words.', 150);
